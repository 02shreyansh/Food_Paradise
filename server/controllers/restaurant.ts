import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Order } from "../models/orders.model";
export const createRestaurant= async(req:Request,res:Response):Promise<any>=>{
    try {
        const {restaurantName,city,country,deliveryTime,cuisines}=req.body;
        const file=req.file;
        const restaurant=await Restaurant.findOne({user:req.id});
        if(restaurant){
            return res.status(400).json({
                success:false,
                message:"Restaurant already exists"
            });
        }
        if(!file){
            return res.status(400).json({
                success:false,
                message:"Please upload a valid image"
            })
        }
        const imageUrl=await uploadImageOnCloudinary(file as Express.Multer.File);
        await Restaurant.create({
            user:req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines:JSON.parse(cuisines),
            imageUrl
        });
        return res.status(201).json({
            success:true,
            message:"Restaurant created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating restaurant"
        })
    }
}
export const getRestaurant=async(req:Request,res:Response):Promise<any>=>{
    try {
        const restaurant =await Restaurant.findOne({user:req.id}).populate("menus");
        if(!restaurant){
            return res.status(404).json({
                success:false,
                restaurant:[],
                message:"Restaurant not found"
            })
        }
        return res.status(200).json({
            success:true,
            restaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching restaurant"
        })
    }
}
export const updateRestaurant=async(req:Request,res:Response):Promise<any>=>{
    try {
        const {restaurantName,city,country,deliveryTime,cuisines}=req.body;
        const file=req.file;
        const restaurant =await Restaurant.findOne({user:req.id});
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            })
        }
        restaurant.restaurantName=restaurantName;
        restaurant.city=city;
        restaurant.country=country;
        restaurant.deliveryTime=deliveryTime;
        restaurant.cuisines=JSON.parse(cuisines);
        if(file){
            const imageUri=await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl=imageUri;
        }
        await restaurant.save();
        return res.status(200).json({
            success:true,
            message:"Restaurant Updated",
            restaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating restaurant"
        })
    }
}
export const getRestaurantOrder=async (req:Request,res:Response):Promise<any>=>{
    try {
        const restaurant =await Restaurant.findOne({user:req.id});
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            })
        }
        const orders=await Order.find({restaurant:restaurant._id}).populate("user").populate("restaurant");
        return res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching restaurant order"
        })
    }
}
export const updateOrderStatus=async (req:Request,res:Response):Promise<any>=>{
    try {
        const {orderId}=req.params;
        const {status}=req.body;
        const order=await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })
        }
        order.status=status;
        await order.save();
        return res.status(200).json({
            success:true,
            message:"Order status updated",
            order,
            status:order.status
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating order status"
        })
    }
}
export const searchRestaurant = async (req: Request, res: Response):Promise<any> => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);
        const query: any = {};
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ]
        }
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ]
        }
        if(selectedCuisines.length > 0){
            query.cuisines = {$in:selectedCuisines}
        }
        const restaurants = await Restaurant.find(query);
        return res.status(200).json({
            success:true,
            data:restaurants
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export const getSingleRestaurant=async (req:Request,res:Response):Promise<any>=>{
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path:'menus',
            options:{createdAt:-1}
        });
        if(!restaurant){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found"
            })
        };
        return res.status(200).json({
            success:true,
            restaurant
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error getting single restaurant"
        })
    }
}
