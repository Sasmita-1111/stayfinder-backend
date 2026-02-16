const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listingModel.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
   
  initData.data = initData.data.map((obj)=>({
    ...obj,owner: '697d8a94ae9f628d65504347',
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

//calls the function so it actually runds
initDB();


//This is called a database seeding script.