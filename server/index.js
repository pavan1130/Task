const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const Task = require("./routes/task");
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

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const { taskId, taskName, assignedTo, priority, dueDate, completion } =
      req.body;

    const task = new Task({
      taskId,
      taskName,
      assignedTo,
      priority,
      dueDate,
      completion,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
