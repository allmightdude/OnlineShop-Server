const router = require("express").Router();
const moment = require("moment");
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const verifyToken = require("../middlewares/verify-token");

const SHIPMENT = {
  normal: {
    price: 13.98,
    days: 7,
  },
  fast: {
    price: 49.98,
    days: 3,
  },
};
function shipmentFunction(shipmentOption) {
  let estimated = new moment()
    .add(shipmentOption.days, "d")
    .format("dddd MMMM Do");

  return { estimated, price: shipmentOption.price };
}

router.post("/shipment", (req, res) => {
  try {
    let shipment;
    if (req.body.shipment === "normal") {
      shipment = shipmentFunction(SHIPMENT.normal);
    } else if (req.body.shipment === "fast") {
      shipment = shipmentFunction(SHIPMENT.fast);
    }

    res.json({
      success: true,
      shipment: shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      msg: error.message,
    });
  }
});

router.post("/payment", verifyToken, (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);

  Stripe.customers
    .create({
      email: req.decoded.email,
    })
    .then((customer) => {
      return Stripe.customers.createSource(customer.id, {
        source: "tok_visa",
      });
    })
    .then((source) => {
      return Stripe.charges.create({
        amount: totalPrice,
        currency: "usd",
        customer: source.customer,
      });
    })
    .then(async (charge) => {
      let order = new Order();
      let cart = req.body.cart;

      cart.map((product) => {
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price,
        });
      });

      order.owner = req.decoded._id;
      order.estimatedDelivery = req.body.estimatedDelivery;
      await order.save();

      res.json({
        success : true,
        msg : "Succussfully create order!"
      })
    });
  //   .catch((err) => {
  //     res.status(500).json({
  //       success: true,
  //       msg: err.message,
  //     });
  //   });
});

module.exports = router;
