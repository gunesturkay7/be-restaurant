const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/restaurant");
const secretKey = "your_secret_key"; // Please replace this with your own secret key

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber: phoneNumber }).populate("organization");
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
    console.log("okey");

    res.status(200).json({
      token,
      isAdmin: user.isAdmin,
      organization: user.organization.organizationId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.register = async (req, res) => {
  try {
    const { phoneNumber, password, isAdmin, organization } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).send("User with this phone number already exists");
    }

    // Check if the organization exists
    const existingOrganization = await Restaurant.findById(organization);
    if (!existingOrganization) {
      return res.status(404).send("Organization not found");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      phoneNumber,
      password: hashedPassword,
      isAdmin,
      organization,
    });

    await user.save();

    // Add this user to the organization's list of employees
    existingOrganization.employees.push(user);
    await existingOrganization.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
