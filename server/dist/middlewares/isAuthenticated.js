"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'User is Unauthorized',
                error: 'No token provided'
            });
        }
        const decode = await jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: 'User is Unauthorized',
            });
        }
        req.id = decode.userId;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.isAuthenticated = isAuthenticated;
