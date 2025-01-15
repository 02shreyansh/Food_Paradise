"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.checkAuth = exports.resetPassword = exports.forgotPassword = exports.logout = exports.verifyEmail = exports.login = exports.signUp = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const generationVerificationCode_1 = require("../utils/generationVerificationCode");
const generateToken_1 = require("../utils/generateToken");
const email_1 = require("../mailTrap/email");
const signUp = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;
        let user = await user_model_1.User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: `User already exist with email ${email}`
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 16);
        const verificationToken = (0, generationVerificationCode_1.generateVerificationCode)();
        user = await user_model_1.User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        (0, generateToken_1.generateToken)(res, user);
        await (0, email_1.sendVerificationEmail)(email, verificationToken);
        const userWithoutPassword = await user_model_1.User.findOne({ email }).select("-password");
        return res.status(201).json({
            success: true,
            message: `User created successfully`,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to SignUp"
        });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email"
            });
        }
        const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        (0, generateToken_1.generateToken)(res, user);
        user.lastLogin = new Date();
        await user.save();
        const userWithoutPassword = await user_model_1.User.findOne({ email }).select("-password");
        res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Login"
        });
    }
};
exports.login = login;
const verifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        const user = await user_model_1.User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Verification Code"
            });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await (0, email_1.sendWelcomeEmail)(user.email, user.fullname);
        return res.status(200).json({
            success: true,
            message: `Email verified successfully for ${user.fullname}`,
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Verify Email"
        });
    }
};
exports.verifyEmail = verifyEmail;
const logout = async (_, res) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Logout , Internal Server Error"
        });
    }
};
exports.logout = logout;
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email not found"
            });
        }
        const resetToken = crypto_1.default.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();
        await (0, email_1.sendPasswordResetEmail)(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);
        return res.status(200).json({
            success: true,
            message: `Password reset link sent to ${user.email} successfully`,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Send Forgot Password Email"
        });
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await user_model_1.User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token or expired token"
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 16);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();
        await (0, email_1.sendResetSuccessEmail)(user.email);
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Reset Password"
        });
    }
};
exports.resetPassword = resetPassword;
const checkAuth = async (req, res) => {
    try {
        const userId = req.id;
        const user = await user_model_1.User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Check Auth"
        });
    }
};
exports.checkAuth = checkAuth;
const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { fullname, email, address, city, country, profilePicture } = req.body;
        let cloudResponse;
        cloudResponse = await cloudinary_1.default.uploader.upload(profilePicture, {
            folder: "Photos"
        });
        const updatedData = { fullname, email, address, city, country, profilePicture };
        const user = await user_model_1.User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");
        return res.status(200).json({
            success: true,
            user,
            message: "Profile Updated Successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Update Profile"
        });
    }
};
exports.updateProfile = updateProfile;
