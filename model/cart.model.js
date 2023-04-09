import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        
    }
});



export const Cart=mongoose.model("cart",CartSchema);