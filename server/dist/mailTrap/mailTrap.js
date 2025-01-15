"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.client = void 0;
const mailtrap_1 = require("mailtrap");
require("dotenv/config");
exports.client = new mailtrap_1.MailtrapClient({
    token: process.env.MAILTRAP_API_TOKEN,
});
exports.sender = {
    email: "hello@demomailtrap.com",
    name: "Home Tution",
};
