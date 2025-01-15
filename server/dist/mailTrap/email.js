"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const htmlEmail_1 = require("./htmlEmail");
const mailTrap_1 = require("./mailTrap");
const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [
        {
            email,
        }
    ];
    try {
        const res = await mailTrap_1.client.send({
            from: mailTrap_1.sender,
            to: recipients,
            subject: "Verify your email",
            html: htmlEmail_1.htmlContent.replace("{verificationToken}", verificationToken),
            category: "Email Verification",
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to send verification email");
    }
};
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = async (email, name) => {
    const recipients = [
        {
            email,
        }
    ];
    try {
        const res = await mailTrap_1.client.send({
            from: mailTrap_1.sender,
            to: recipients,
            subject: "Welcome to FoodApp",
            html: (0, htmlEmail_1.generateWelcomeEmailHtml)(name),
            template_variables: {
                company_info_name: "FoodApp",
                name: name
            }
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to send  email");
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipients = [
        {
            email,
        }
    ];
    try {
        const res = await mailTrap_1.client.send({
            from: mailTrap_1.sender,
            to: recipients,
            subject: "Password Reset Email",
            html: (0, htmlEmail_1.generatePasswordResetEmailHtml)(resetUrl),
            category: "Reset Password",
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to send email");
    }
};
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = async (email) => {
    const recipients = [
        {
            email,
        }
    ];
    try {
        const res = await mailTrap_1.client.send({
            from: mailTrap_1.sender,
            to: recipients,
            subject: "Password Reset Successfully",
            html: (0, htmlEmail_1.generateResetSuccessEmailHtml)(),
            category: "Password Reset",
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to send email");
    }
};
exports.sendResetSuccessEmail = sendResetSuccessEmail;
