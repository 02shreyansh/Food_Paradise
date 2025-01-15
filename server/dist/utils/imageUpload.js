"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("./cloudinary"));
const uploadImageOnCloudinary = async (file) => {
    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary_1.default.uploader.upload(dataURI, {
        folder: "Restaurant"
    });
    return uploadResponse.secure_url;
};
exports.default = uploadImageOnCloudinary;
