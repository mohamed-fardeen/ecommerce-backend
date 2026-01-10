const express = require("express");
const locationRouter = express.Router();
const Coordinates = require("../../database/schemas/locationCoordinatesSchema");
const Address = require("../../database/schemas/addressSchema");
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

// Get all coordinates for a user
locationRouter.get("/coordinates", authenticateToken, async (req, res) => {
  try {
    const coordinates = await Coordinates.find({ userId: req.user._id });
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch coordinates" });
  }
});

// Add new coordinates (GPS data)
locationRouter.post("/coordinates", authenticateToken, async (req, res) => {
  try {
    const coordinatesData = {
      userId: req.user._id,
      lat: req.body.lat,
      lng: req.body.lng
    };
    
    const newCoordinates = new Coordinates(coordinatesData);
    await newCoordinates.save();
    res.status(201).json(newCoordinates);
  } catch (error) {
    res.status(500).json({ error: "Failed to save coordinates" });
  }
});

// Get all addresses for a user
locationRouter.get("/address", authenticateToken, async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

// Add new address (typed address data)
locationRouter.post("/address", authenticateToken, async (req, res) => {
  try {
    const addressData = {
      userId: req.user._id,
      addressLine1: req.body.addressLine1,
      addressLine2: req.body.addressLine2,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      isDefault: req.body.isDefault || false
    };
    
    const newAddress = new Address(addressData);
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: "Failed to save address" });
  }
});

// Update address
locationRouter.put("/address/:id", authenticateToken, async (req, res) => {
  try {
    const address = await Address.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (!address) return res.sendStatus(404);
    
    Object.assign(address, req.body);
    await address.save();
    res.json(address);
  } catch (error) {
    res.status(500).json({ error: "Failed to update address" });
  }
});

// Delete address
locationRouter.delete("/address/:id", authenticateToken, async (req, res) => {
  try {
    const result = await Address.deleteOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    });
    
    if (result.deletedCount === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address" });
  }
});

module.exports = { locationRouter };
