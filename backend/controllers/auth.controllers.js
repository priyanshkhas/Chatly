import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// signUp
export const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // ✅ Validate all fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ Check if username already exists
        const checkUserByUserName = await User.findOne({ userName });
        if (checkUserByUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // ✅ Check if email already exists
        const checkUserByEmail = await User.findOne({ email });
        if (checkUserByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // ✅ Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create user
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        // ✅ Generate token
        const token = await genToken(user._id);

        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({ message: `signup error ${error}` });
    }
};

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: false
        });

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: `login error ${error}` });
    }
};

// logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Log out successfully" });
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error}` });
    }
};
