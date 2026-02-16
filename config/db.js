const mongoose = require("mongoose");

const dbURL =
  process.env.ATLASDB_URL;

module.exports = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
