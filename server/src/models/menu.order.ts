import mongoose, { Document } from "mongoose";
export interface menuModel{
    // _id:mongoose.Schema.Types.ObjectId;
    name: string;
    description:string;
    price:number;
    image:string;
}
export interface menuDocument extends menuModel,Document{
    createdAt:Date;
    updatedAt:Date;
}
const menuSchema=new mongoose.Schema<menuDocument>({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Menu =mongoose.model("Menu",menuSchema);