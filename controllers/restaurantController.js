const Restaurant = require("../models/restaurant");

exports.getRestaurantDetails = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("employees").populate("recentAccounts");

    if (!restaurant) {
      return res.status(404).send("No restaurant found");
    }

    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const { organizationId, tables } = req.body;

    // Check if the organization already exists
    const existingRestaurant = await Restaurant.findOne({ organizationId });
    if (existingRestaurant) {
      return res.status(409).send("Restaurant with this Organization ID already exists");
    }

    const restaurant = new Restaurant({
      organizationId,
      tables,
      employees: [],
      recentAccounts: [],
    });

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
