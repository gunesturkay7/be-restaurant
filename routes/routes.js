// routes.js

const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController.js");
const userController = require("../controllers/userController.js");

router.get("/restaurant/:id", restaurantController.getRestaurantDetails);
router.post("/restaurant", restaurantController.createRestaurant);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
