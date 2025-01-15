"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMenu = exports.addMenu = void 0;
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const menu_order_1 = require("../models/menu.order");
const restaurant_model_1 = require("../models/restaurant.model");
const addMenu = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        ;
        const imageUrl = await (0, imageUpload_1.default)(file);
        const menu = await menu_order_1.Menu.create({
            name,
            description,
            price,
            image: imageUrl
        });
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (restaurant) {
            restaurant.menus.push(menu._id);
            await restaurant.save();
        }
        return res.status(201).json({
            success: true,
            message: "Menu added successfully",
            menu
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error" });
    }
};
exports.addMenu = addMenu;
const editMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const file = req.file;
        const menu = await menu_order_1.Menu.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu not found"
            });
        }
        if (name)
            menu.name = name;
        if (description)
            menu.description = description;
        if (price)
            menu.price = price;
        if (file) {
            const imageUrl = await (0, imageUpload_1.default)(file);
            menu.image = imageUrl;
        }
        await menu.save();
        return res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            menu,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
exports.editMenu = editMenu;
