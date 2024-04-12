const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Setting up the server
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8060;

app.use(cors());
app.use(express.json());

//Setting Up Routing
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

//Add routes here
app.use("/ai", require("./routes/AIRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});