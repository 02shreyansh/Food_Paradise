import express from "express";
import { 
    checkAuth,
    forgotPassword,
    login,
    logout,
    resetPassword,
    signUp,
    updateProfile,
    verifyEmail 
} from "../controllers/user";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const router=express.Router();
router.get("/check-auth",isAuthenticated,checkAuth)
router.post("/signup",signUp);
router.post("/login",login);
router.post("/logout",logout);
router.post("/verify-email",verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);
router.put("/profile/update",isAuthenticated,updateProfile);

export default router;