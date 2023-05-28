// routes.js

const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController.js");
const userController = require("../controllers/userController.js");

router.get("/restaurant/:id", restaurantController.getRestaurantDetails);
router.post("/restaurant", restaurantController.createRestaurant);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/test", (req, res) => {
  res.send("Welcome to the Restaurant API");
});

module.exports = router;
