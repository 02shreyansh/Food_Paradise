"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const connectDB_1 = __importDefault(require("./db/connectDB"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const menu_1 = __importDefault(require("./routes/menu"));
const order_1 = __importDefault(require("./routes/order"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 10000;
const DIRNAME = path_1.default.resolve();
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: ["https://food-paradise-3zpn.onrender.com"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/restaurant", restaurant_1.default);
app.use("/api/v1/menu", menu_1.default);
app.use("/api/v1/order", order_1.default);
app.use(express_1.default.static(path_1.default.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
    res.sendFile(path_1.default.resolve(DIRNAME, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ error: 'File size exceeds the allowable limit.' });
        }
    }
    next(err);
});
app.listen(port, '0.0.0.0', () => {
    (0, connectDB_1.default)(process.env.MONGOURI);
    console.log(`server is running on port ${port}`);
});
app.get("/", (_, res) => {
    res.send("hello world");
});
