import mongoose from "mongoose";

const order = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userId"
    },
    billamount:{
        type:Number,
        required:true
    },
    contactPerson:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    delieveryAddress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    paymentMode:{
        type:String,
        default:"Cash On Delievery"
    },
    orderItem:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"book"
            }
        }
    ]

})