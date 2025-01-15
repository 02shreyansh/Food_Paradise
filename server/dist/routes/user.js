"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.get("/check-auth", isAuthenticated_1.isAuthenticated, user_1.checkAuth);
router.post("/signup", user_1.signUp);
router.post("/login", user_1.login);
router.post("/logout", user_1.logout);
router.post("/verify-email", user_1.verifyEmail);
router.post("/forgot-password", user_1.forgotPassword);
router.post("/reset-password/:token", user_1.resetPassword);
router.put("/profile/update", isAuthenticated_1.isAuthenticated, user_1.updateProfile);
exports.default = router;
