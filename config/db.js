const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const Connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`mongodb is Connected!`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
