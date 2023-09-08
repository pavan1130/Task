const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
require("dotenv").config();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using the environment variable
const mongoURI =
  "mongodb+srv://admin:11301130@cluster0.ibfabjp.mongodb.net/task?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const authRoute = require("./routes/signup");
app.use("/", authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
