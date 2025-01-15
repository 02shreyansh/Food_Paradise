"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleRestaurant = exports.searchRestaurant = exports.updateOrderStatus = exports.getRestaurantOrder = exports.updateRestaurant = exports.getRestaurant = exports.createRestaurant = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const orders_model_1 = require("../models/orders.model");
const createRestaurant = async (req, res) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exists"
            });
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a valid image"
            });
        }
        const imageUrl = await (0, imageUpload_1.default)(file);
        await restaurant_model_1.Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });
        return res.status(201).json({
            success: true,
            message: "Restaurant created successfully"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating restaurant"
        });
    }
};
exports.createRestaurant = createRestaurant;
const getRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id }).populate("menus");
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found"
            });
        }
        return res.status(200).json({
            success: true,
            restaurant
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching restaurant"
        });
    }
};
exports.getRestaurant = getRestaurant;
const updateRestaurant = async (req, res) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);
        if (file) {
            const imageUri = await (0, imageUpload_1.default)(file);
            restaurant.imageUrl = imageUri;
        }
        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant Updated",
            restaurant
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating restaurant"
        });
    }
};
exports.updateRestaurant = updateRestaurant;
const getRestaurantOrder = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        const orders = await orders_model_1.Order.find({ restaurant: restaurant._id }).populate("user").populate("restaurant");
        return res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching restaurant order"
        });
    }
};
exports.getRestaurantOrder = getRestaurantOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await orders_model_1.Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        order.status = status;
        await order.save();
        return res.status(200).json({
            success: true,
            message: "Order status updated",
            order,
            status: order.status
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating order status"
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const searchRestaurant = async (req, res) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery || "";
        const selectedCuisines = (req.query.selectedCuisines || "").split(",").filter(cuisine => cuisine);
        const query = {};
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
            ];
        }
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: 'i' } },
                { cuisines: { $regex: searchQuery, $options: 'i' } }
            ];
        }
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }
        const restaurants = await restaurant_model_1.Restaurant.find(query);
        return res.status(200).json({
            success: true,
            data: restaurants
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.searchRestaurant = searchRestaurant;
const getSingleRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurant_model_1.Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 }
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        ;
        return res.status(200).json({
            success: true,
            restaurant
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error getting single restaurant"
        });
    }
};
exports.getSingleRestaurant = getSingleRestaurant;
