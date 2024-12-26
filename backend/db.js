const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://tastytreat:tastytreatwebapp@cluster0.j6vcpoq.mongodb.net/tastytreatmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  console.log("Attempting to connect to MongoDB...");
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected successfully");
    try {
      // const fetchItems = await mongoose.connection.db.collection("food_items");
      // fetchItems.find({}).toArray(async function (err, data) {
      //   const foodCategory = await mongoose.connection.db.collection(
      //     "food_category"
      //   );
      //   foodCategory.find({}).toArray(function (err, catData) {
      //     if (err) console.log(err);
      //     else {
      //       global.food_items = data;
      //       global.food_category = catData;
      //     }
      //   });
      // });

      const fetchItems = await mongoose.connection.db
        .collection("food_items")
        .find({})
        .toArray();
      const foodCategory = await mongoose.connection.db
        .collection("food_category")
        .find({})
        .toArray();

      global.food_items = fetchItems;
      global.food_category = foodCategory;

      // console.log("data", data)
      // console.log("Fetched items:", data);
    } catch (fetchError) {
      console.error("Error fetching items:", fetchError);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
