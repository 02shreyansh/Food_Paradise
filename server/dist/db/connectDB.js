"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = async (uri) => {
    try {
        const { connection } = await mongoose_1.default.connect(uri);
        console.log("Connected to MongoDB=>", connection.host);
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDb;
