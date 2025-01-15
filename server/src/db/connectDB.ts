import mongoose from "mongoose";
const connectDb=async(uri:string)=>{
    try {
        const {connection} =await mongoose.connect(uri);
        console.log("Connected to MongoDB=>",connection.host);    
    } catch (error) {
        console.log(error);
    }
}
export default connectDb;