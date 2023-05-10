import { request, response } from "express";
import { Cart } from "../model/cart.model.js";
import { Order } from "../model/order.model.js";
export const saveOrder = (request, response, next) => {
    console.log(request.body)
    Order.create({
        userId: request.body.userId, cartId: request.body.cartId, billamount: request.body.billamount, contactPerson: request.body.contactPerson, contactNumber: request.body.contactNumber,date:request.body.date,
        delieveryAddress: request.body.delieveryAddress, status: request.body.status, paymentMode: request.body.paymentMode, sellerId: request.body.sellerId,
        orderItem: request.body.cartItems
    }).then((result) => {
        Cart.findOne({ userId: request.body.userId }).then(result => {
            console.log(result);
            result.deleteOne().then(result => {
                return response.status(200).json({ message: "Order Placed SuccesFully", status: true });
            })
        }).catch(err => {
            console.log(err)
            return response.status(500).json({ msg: "Internal Server Error", status: false })
        })

    }).catch((err) => {
       console.log(err);
        return response.status(500).json({ err: "Internal Server Error", status: false })
    })
}


export const vieworderList = (request, response, next) => {
    Order.find().then(result => {
        return response.status(200).json({ msg: "All Orders List", orderlist: result, status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}

export const vieworderHistoryByUserId = (request, response, next) => {
    Order.find({userId: request.body.userId }).then(result => {
       
        return response.status(200).json({ msg: " Your All Orders ", orderlist: result, status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}


export const vieworderByorderId = (request, response, next) => {
   
    Order.findById(request.body.id).populate({
        path:"orderItem",
        populate:{path:"bookId"}
    }).then((result) => {
        console.log(result);
        return response.status(200).json({ order: result, status: true });
    }).catch((err) => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}


export const changestatus = async (request, response, next) => {
    try {
        await Order.findOneAndUpdate({ _id: request.body.id }, { $set: { status: request.body.status }, }, { new: true }) ? response.status(202).json({ msg: "Status Update Succesfully", status: true }) :
            response.status(404).json({ err: "Request Resouce Not Found", status: false });
    } catch (err) {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }

}


export const viewOrderBySellerId = (request, response, next) => {
    Order.find({ sellerId: request.body.sellerId }).then((result) => {
        return response.status(200).json({ result: result, status: true });
    }).catch((err) => {
        return response.status(500).json({ msg: "Internal Server Eror", status: false });
    })
}