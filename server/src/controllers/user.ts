import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs"
import crypto from "crypto"
import cloudinary from "../utils/cloudinary";
import { generateVerificationCode } from "../utils/generationVerificationCode";
import { generateToken } from "../utils/generateToken";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailTrap/email";
export const signUp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { fullname, email, password, contact } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: `User already exist with email ${email}`
            });
        }
        const hashedPassword = await bcrypt.hash(password, 16);
        const verificationToken = generateVerificationCode() as any;
        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        generateToken(res,user);
        await sendVerificationEmail(email,verificationToken);
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(201).json({
            success: true,
            message: `User created successfully`,
            user: userWithoutPassword,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to SignUp"
        })
    }
}
export const login = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "Incorrect Password"
            })
        }
        generateToken(res,user);
        user.lastLogin = new Date();
        await user.save();
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            user: userWithoutPassword,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Login"
        })
    }
}
export const verifyEmail = async (req: Request, res: Response):Promise<any> => {
    try {
        const { verificationCode } = req.body;
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Verification Code"
            })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email,user.fullname);
        return res.status(200).json({
            success: true,
            message: `Email verified successfully for ${user.fullname}`,
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Verify Email"
        })
    }
}
export const logout = async (_: Request, res: Response):Promise<any> => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Logout , Internal Server Error"
        })
    }
}
export const forgotPassword = async (req: Request, res: Response):Promise<any> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email not found"
            })
        }
        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();
        await sendPasswordResetEmail(user.email,`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);
        return res.status(200).json({
            success: true,
            message: `Password reset link sent to ${user.email} successfully`,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Send Forgot Password Email"
        })
    }
};
export const resetPassword = async (req: Request, res: Response):Promise<any> => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token or expired token"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 16);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Reset Password"
        })
    }
}
export const checkAuth = async (req: Request, res: Response):Promise<any> => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Check Auth"
        })
    }
}
export const updateProfile = async (req: Request, res: Response):Promise<any> => {
    try {
        const userId = req.id;
        const { fullname, email, address, city, country, profilePicture } = req.body;
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture,{
            folder:"Photos"
        });
        const updatedData={ fullname, email, address, city, country, profilePicture };
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");
        return res.status(200).json({
            success: true,
            user,
            message:"Profile Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Update Profile"
        })
    }
}