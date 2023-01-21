const router = require("express").Router();
const moment = require("moment");

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

module.exports = router;
