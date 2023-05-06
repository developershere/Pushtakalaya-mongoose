import { request, response } from "express";
import Razorpay from "razorpay";
export const paymentGateway = (request,response,next)=>{
    let payment = new Razorpay({
        key_id:HTMLSlotElement.key_id,
        key_secret:HTMLSlotElement.key_secret
    });    
    let orderDate = {
        "amount" : request.body.bookingAmount*100,
        "currency" : "INR",
        "receipt" : "receipt",
        "payment_capture" : 1
    };
    instance.orders.create(orderDate,function(err,order){
        response.status(200).send(order);
    });
};

export const confirmPayment = async (request,response,next)=>{
    var newEvent = new Event.model({
        name : request.body.name,
        checkInDate : request.body.checkinDate,
        checkOutDate : request.body.checkOutDate,
        guest : request.body.guest,
        payments : [],
        hoetl_id : request.body.hoetl_id
    });
    let payment = {
        amount : request.body.bookingAmount,
        order_id : request.body.order_id,
        payment_id : request.body.payment_id
    };
    newEvent.payments = [...newEvent.payments,payment];
    await newEvent.save().catch(err=>{throw err});
    response.status(200).json({data : newEvent,status : true});
}