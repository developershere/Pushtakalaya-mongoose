import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
const CartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        unique : true    
    },
    cartItems:[{
        bookId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"book",
            unique : true
        }
    }]
});
CartSchema.plugin(uniqueValidator);
export const Cart =mongoose.model("cart",CartSchema);