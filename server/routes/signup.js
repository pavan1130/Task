const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const user = new User({
      username,
      email,
      password,
    });

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    const savedUser = await user.save();
    res
      .status(200)
      .json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res
      .status(200)
      .json({
        message: "Login successful!",
        user: { username: user.username, email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed." });
  }
});

module.exports = router;
