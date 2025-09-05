import User from "../models/User.js";
import  jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        const user = await User.create({
            fullName,
            email,
            password,
            // profileImageUrl
        });
        res.status(201).json({
            _id: user._id,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token: generateToken(user._id)
        });

    }
    catch (error) {
        console.error("REGISTER ERROR:", error); 
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }
        res.status(500).json({ message: error.message  });
    }
};

export const loginUser = async (req, res) => {
    const{ email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            _id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};