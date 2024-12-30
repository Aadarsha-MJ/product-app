import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    //Hash the password before saving

    //create a new user
    const newUser = new User({ name, email, password });

    // save the user to the database
    await newUser.save();

    // Generate a token
    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user exists
    const eUser = await User.findOne({ email });
    if (!eUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    //compare password
    const isMatch = await eUser.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    //generate token
    const token = generateToken(eUser._id);
    // Send response with user info (excluding password) and token
    res.status(200).json({
      success: true,
      message: "You have successfully logged in!",
      data: {
        _id: eUser._id,
        name: eUser.name,
        email: eUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return (
        res.status(404), json({ success: false, message: "User not found" })
      );
    }

    // send the user data
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



