const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");
const { route } = require("./personRoutes");
const { message } = require("prompt");

// -------------------------For Menu -----------------------

router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request contains the person data

    // Create a new Menu document using the Mongoose model
    const newMenu = new MenuItem(data);

    // Save the new menu to the database
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste; // Extract the taste from the URL Parameter
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched for menu");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Taste Type" });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; //Extract the id from the URL parameter
    const updateMenuData = req.body; // updated data for the menu

    const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuData, {
      new: true, // Return the updated document
      runValidators: true, // Run Mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // Extract the Menu ID from the URL Parameter

    //Assuming you have a Menu model
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "Item not found" });
    }

    console.log("data fetched");
    res.status(200).json({ message: "Item Delted Seccuessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
