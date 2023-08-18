const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://umar0711509:pk7gjfjoQ2FcMhrJ@cluster0.ttzmo8p.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`mongoose not connect due to ${err}`);
  });
