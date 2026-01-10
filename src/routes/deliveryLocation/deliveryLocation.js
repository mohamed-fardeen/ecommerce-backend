const express = require("express");
const deliveryLocationRouter = express.Router();
const DeliveryLocation = require("../../database/schemas/deliveryLocationSchema");
const jwt = require("jsonwebtoken");
const Users = require("../../database/schemas/userSchema");

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) return res.sendStatus(403);
    const user = await Users.findById(data.id);
    if (!user) return res.sendStatus(404);
    req.user = user;
    next();
  });
};

// Get all delivery locations for a user
deliveryLocationRouter.get("/delivery-location", authenticateToken, async (req, res) => {
  try {
    const locations = await DeliveryLocation.find({ userId: req.user._id });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch delivery locations" });
  }
});

// Add a new delivery location
deliveryLocationRouter.post("/delivery-location", authenticateToken, async (req, res) => {
  try {
    const locationData = {
      ...req.body,
      userId: req.user._id
    };
    
    // If this is set as default, unset other default locations
    if (locationData.isDefault) {
      await DeliveryLocation.updateMany(
        { userId: req.user._id },
        { isDefault: false }
      );
    }
    
    const newLocation = new DeliveryLocation(locationData);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: "Failed to add delivery location" });
  }
});

// Update a delivery location
deliveryLocationRouter.put("/delivery-location/:id", authenticateToken, async (req, res) => {
  try {
    const location = await DeliveryLocation.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!location) return res.sendStatus(404);
    
    // If this is set as default, unset other default locations
    if (req.body.isDefault) {
      await DeliveryLocation.updateMany(
        { userId: req.user._id, _id: { $ne: req.params.id } },
        { isDefault: false }
      );
    }
    
    Object.assign(location, req.body);
    await location.save();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: "Failed to update delivery location" });
  }
});

// Delete a delivery location
deliveryLocationRouter.delete("/delivery-location/:id", authenticateToken, async (req, res) => {
  try {
    const result = await DeliveryLocation.deleteOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (result.deletedCount === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete delivery location" });
  }
});

module.exports = { deliveryLocationRouter };
