import express, { NextFunction } from "express";
import "dotenv/config"
import connectDb from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user"
import restaurantRoute from "./routes/restaurant"
import menuRoute from "./routes/menu"
import orderRoute from "./routes/order"
import multer from "multer";
import path from "path";
const app = express();
const PORT = process.env.PORT || 10000
const DIRNAME=path.resolve();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: ["https://food-paradise-ovjb.onrender.com"],
    credentials: true,
}
app.use(cors(corsOptions));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);
app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res)=>{
    res.sendFile(path.resolve(DIRNAME,"client","dist","index.html"));
});

app.use((err:any, req:any, res:any, next:NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({ error: 'File size exceeds the allowable limit.' });
        }
    }
    next(err);
});

app.listen(PORT, () => {
    connectDb(process.env.MONGOURI!)
    console.log(`server is running on port ${PORT}`)
})
app.get("/", (_, res) => {
    res.send("hello world")
})
