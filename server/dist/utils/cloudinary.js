"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
require("dotenv/config");
cloudinary_1.v2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SCRET,
    cloud_name: process.env.CLOUD_NAME,
});
exports.default = cloudinary_1.v2;
