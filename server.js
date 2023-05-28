// server.js

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes"); // adjust the path as needed
const cors = require("cors");
const connectDB = require("./db/db");

const app = express();
connectDB();

app.use(cors()); // use CORS middleware

app.use(bodyParser.json());
app.use("/", routes);
app.use("/test", (req, res) => {
  res.send("Welcome to the Restaurant API");
});

app.listen(3030, () => console.log(`Server is running on 3030`));
