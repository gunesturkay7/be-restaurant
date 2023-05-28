// server.js

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes"); // adjust the path as needed
const cors = require("cors");
const connectDB = require("./db/db");
const dotenv = require("dotenv");

const app = express();
connectDB();

app.use(cors()); // use CORS middleware

app.use(bodyParser.json());
///app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use("/test", (req, res) => {
  res.send("Welcome to the Restaurant API");
});

app.listen(process.env.PORT, () => console.log(`Server is running on 3000`));
