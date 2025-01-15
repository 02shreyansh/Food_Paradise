import mongoose, { Document } from "mongoose";
type deliveryDetails={
    email:string;
    name:string;
    address:string;
    city:string
}
type cartItem={
    menuId:string;
    name:string;
    image:string;
    price:number;
    quantity:number;
}
export interface orderModel extends Document{
    user:mongoose.Schema.Types.ObjectId;
    restaurant:mongoose.Schema.Types.ObjectId;
    deliveryDetails:deliveryDetails,
    cartItems:cartItem;
    totalAmount:number;
    status:"pending" | "confirmed" | "preparing" | "outForDelivery" | "delivered" | "cancelled";

}
const orderSchema=new mongoose.Schema<orderModel>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
        required:true
    },
    deliveryDetails:{
        email:{type:String,required:true},
        name:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true}
    },
    cartItems:[
        {
            menuId:{type:String,required:true},
            name:{type:String,required:true},
            image:{type:String,required:true},
            price:{type:Number,required:true},
            quantity:{type:Number,required:true},
        }
    ],
    totalAmount:{type:Number,required:true},
    status:{
        type:String,
        enum:["pending" , "confirmed" , "preparing" , "outForDelivery" , "delivered" , "cancelled"],
        required:true
    }

},{timestamps:true});
export const Order=mongoose.model("Order",orderSchema);