import { request, response } from "express";
import { Cart } from "../model/cart.model.js";
import { Order } from "../model/order.model.js";
export const saveOrder =(request ,response,next)=>{

    Order.create({userId:request.body.userId,cartId:request.body.cartId, billamount:request.body.billamount,  contactPerson:request.body.contactPerson, contactNumber:request.body.contactNumber, 
        delieveryAddress:request.body.delieveryAddress,status:request.body.status, paymentMode:request.body.paymentMode, sellerId:request.body.sellerId,
        orderItem:[{bookId:request.body.bookId}]}).then((result)=>{
        Cart.findOne({userId:request.body.userId}).then(result=>{
            result.deleteOne().then(result=>{
                return response.status(200).json({message:"Order Placed SuccesFully",status:true});
            })
        }).catch(err=>{
            return response.status(500).json({msg:"Internal Server Error",status:false})
        })
       
    }).catch((err)=>{
        console.log(err);
        return response.status(500).json({err:"Internal Server Error" ,status:false})
    })
}


export const  vieworderList=(request,response,next)=>{
    Order.find().then(result=>{
         return response.status(200).json({msg:"All Orders List",orderlist:result,status:true});
    }).catch(err=>{
        return response.status(500).json({err:"Internal Server Error",status:false});
    })
}

export const vieworderHistoryByUserId=(request,response,next)=>{
    Order.find({userId:request.params.userId}).then(result=>{
        return response.status(200).json({msg:" Your All Orders ",orderlist:result,status:true});
    }).catch(err=>{
        return response.status(500).json({err:"Internal Server Error",status:false});
    })
}


//check this api
export const changestatus=async(request,response,next)=>{
    try {
        let order = await Order.findById(request.body.id);
        console.log(order)
        if (!order)
            return response.status(404).json({ err: "Resource not found", status: false })
            Order.updateOne({id :request.body.id},{$set : {status : request.body.status}})
            ? response.status(200).json({ msg: "Order Update Succesfully", status: true }) : response.status(404).json({ err: "Request Resource Not Found", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }

}