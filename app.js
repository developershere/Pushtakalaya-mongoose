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

import env from "dotenv"
import mongoose from "mongoose";

import cors from "cors"

const app = express();
env.config();
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DataBase Connect")).catch((err)=>console.log("database not connected"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",userRoute);
app.use("/state",stateRouter);
app.use("/city",cityRouter);
app.use("/book",BookRoute);
app.use("/category",CategoryRoute);
app.use("/admin",AdminRouter)
app.use("/cart",CartRouter);
app.use("/order",OrderRoute)

app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})