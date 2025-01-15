import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import {client,sender} from "./mailTrap"
export const sendVerificationEmail=async(email:string,verificationToken:string)=>{
    const recipients=[
        {
            email,
        }
    ];
    try {
        const res=await client.send({
            from:sender,
            to:recipients,
            subject:"Verify your email",
            html:htmlContent.replace("{verificationToken}",verificationToken),
            category:"Email Verification",
        })
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send verification email");
    }
}
export const sendWelcomeEmail=async(email:string,name:string)=>{
    const recipients=[
        {
            email,
        }
    ];
    try {
        const res=await client.send({
            from:sender,
            to:recipients,
            subject:"Welcome to FoodApp",
            html:generateWelcomeEmailHtml(name),
            template_variables:{
                company_info_name:"FoodApp",
                name:name
            }
        })
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send  email");
    }
}
export const sendPasswordResetEmail=async(email:string,resetUrl:string)=>{
    const recipients=[
        {
            email,
        }
    ];
    try {
        const res=await client.send({
            from:sender,
            to:recipients,
            subject:"Password Reset Email",
            html:generatePasswordResetEmailHtml(resetUrl),
            category:"Reset Password",
        })
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send email");
    }
}
export const sendResetSuccessEmail=async(email:string)=>{
    const recipients=[
        {
            email,
        }
    ];
    try {
        const res=await client.send({
            from:sender,
            to:recipients,
            subject:"Password Reset Successfully",
            html:generateResetSuccessEmailHtml(),
            category:"Password Reset",
        })
    } catch (error) {
        console.error(error);
        throw new Error("Failed to send email");
    }
}