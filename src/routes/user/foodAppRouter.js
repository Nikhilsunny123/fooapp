import express from "express";

import userAuthenticator from "../../common/userAuthenticator";
import FoodApp from "../../models/foodModel";

const foodAppRouter = express.Router();

foodAppRouter.get("/", userAuthenticator, async (req, res) => {
  try {
    const foods = await FoodApp.find({});

    return res.status(200).json({
      data: foods,
    });
  } catch (error) {
    let message = "Server Error";
    if (error.message) {
      message = error.message;
    }
    return res.status(500).json({ message: message });
  }
});

foodAppRouter.get("/:itemid", userAuthenticator, async (req, res) => {
  try {
    const itemid = req.params.itemid;
    console.log(itemid);
    const food = await FoodApp.findOne({ _id: itemid });
    if (!food) {
      return res.status(500).json({ message: "food doesnt exist" });
    } else {
      return res.status(200).json({
        data: food,
      });
    }
  } catch (error) {
    let message = "Server Error";
    if (error.message) {
      message = error.message;
    }
    return res.status(400).json({ message: message });
  }
});

export default foodAppRouter;
