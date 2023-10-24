import mongoose from "mongoose";

const foodAppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // select: false
  },
});

const FoodApp = mongoose.model("FoodApp", foodAppSchema);

export default FoodApp;
