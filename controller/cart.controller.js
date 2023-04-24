import { request, response } from "express";
import {Cart}from "../model/cart.model.js"
export const addToCart=async(request,response,next)=>{
  try{
    let cart = await Cart.findOne({userId:request.body.userId});
    if(cart){
        if(cart.cartItems.some((item)=>item.bookId==request.body.bookId))
          return response.status(200).json({message:"Book Already Exist In Cart"});
          cart.cartItems.push({bookId:request.body.bookId});
        
        let savecart = await cart.save();
        return response.status(200).json({message:"Item Added  SuccesFully In Cart"});
    }else{
        let savecart = await Cart.create({
          userId:request.body.userId,
           cartItems:[{bookId:request.body.bookId}]
       });
        response.status(200).json({msg:"Book Added SuccesFully In Cart",status:true})
    }

  }catch(err){
    console.log(err);
    return response.status(200).json({msg:"Inernal Server Error",status:false});
  }
}

export const fetchCart =(request,response,next)=>{
    Cart.find({userId:request.body.userId}).populate("cartItems.bookId").then(result=>{
          return response.status(200).json({cart:result,status:true});
    }).catch(err=>{
      console.log(err);
        return response.status(200).json({msg:"Inernal Server Error",status:false});
    })
}


export const removeBookInCart=async(request,response,next)=>{
    try {
      let cart = await Cart.find({userId:request.body.userId}).populate("cartItems.bookId");
      console.log(cart);
      if (!cart)
          
          return response.status(404).json({ err: " Request Resource not found", status: false })
       await cart.deleteOne()?response.status(200).json({ msg: "Remove Book In Cart ", status: true }):response.status(404).json({ err: "Resource not found", status: false });
     
  } catch (err) {
      return response.status(500).json({ err: "Internal Server Error", status: false });
  }
}