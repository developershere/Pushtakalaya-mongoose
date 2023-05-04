import bodyParser from "body-parser";
import express from "express";
import userRoute from "./routes/user.route.js"
import stateRouter from "./routes/state.route.js"
import cityRouter from "./routes/city.route.js"
import BookRoute  from "./routes/book.route.js"
import CategoryRoute from "./routes/category.route.js";
import AdminRouter from "./routes/admin.route.js"
import CartRouter from "./routes/cart.route.js"
import OrderRoute from "./routes/order.route.js"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Razorpay from "razorpay";
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Database connected..."));
app.set("view-engine","ejs");
app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
dotenv.config();
app.use("/user",userRoute);
app.use("/state",stateRouter);
app.use("/city",cityRouter);
app.use("/book",BookRoute);
app.use("/category",CategoryRoute);
app.use("/admin",AdminRouter)
app.use("/cart",CartRouter);
app.use("/order",OrderRoute);
export const instance = new Razorpay({
    key_id: process.env.key_id,
    
})
app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})