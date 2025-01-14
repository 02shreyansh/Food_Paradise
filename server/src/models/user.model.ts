import mongoose, { Document } from "mongoose";
export interface userModel{
    fullname:string;
    email:string;
    password:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    lastLogin?:Date;
    isVerified?:boolean;
    resetPasswordToken?:string;
    resetPasswordTokenExpiresAt?:Date;
    verificationToken?:string,
    verificationTokenExpiresAt?:Date,
}

export interface userDocument extends userModel,Document{
    createdAt:Date;
    updatedAt:Date;
}

const userSchema=new mongoose.Schema<userDocument>({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        default:"Update Your address"
    },
    city:{
        type:String,
        default:"Update Your city"
    },
    country:{
        type:String,
        default:"Update Your country"
    },
    profilePicture:{
        type:String,
        default:""
    },
    admin:{
        type:Boolean,
        default:false
    },
    // advanced Authentication
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,

},{timestamps:true});
export const User=mongoose.model("User",userSchema);