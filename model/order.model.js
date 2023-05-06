import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
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
    date:{
       type:String,
       default: new Date().toString().substring(4,15).replaceAll(' ','-')
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

export const Order = mongoose.model("order",orderSchema)