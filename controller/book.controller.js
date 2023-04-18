import { request, response } from "express";
import { Book } from "../model/book.model.js";
import { validationResult } from "express-validator";

export const saveProduct = async (request, response, next) => {
    try {
        for (let book of request.body.books) {
            let { name, author, published, price, language, edition, photos, description, userId, cityId, pinCode, categoryId, publicationDate, status, permission } = book;
               await Book.create({
                name: name, author: author, published: published, price: price, language: language, edition: edition, photos: photos, description: description, userId: userId, cityId: cityId, pinCode: pinCode, categoryId: categoryId, publicationDate: publicationDate, status: status, permission: permission
            });
        }
        return response.status(200).json({ msg: "Add products Succesfully", status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    }
}

export const addBook=async(request,response,next)=>{
    try{
    let error = await validationResult(request.body);
    if (!error.isEmpty())
        return response.status(400).json({ Error: "Bad request ", Message: error.array() });
        await Book.create(request.body)?response.status(200).json({ Message: "Book has been saved ...", status: true}): response.status(500).json({ Message: "Internal Server error...", status: false })
        
    }catch(err){
          console.log(err);
        return response.status(500).json({err:"Internal Server Error",status:false});
    }
}

export const removeBook=async(request,response,next)=>{
    try {
        let book = await Book.updateOne({ id: request.params.id}, { status: false });
        console.log("Book Remove : " + book);
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ Message: "Internal server error...", status: false });
    }
}

export const bookList =(request,response,next)=>{
   Book.find().then(result=>{
    return response.status(200).json({bookList:result,status:true});
  }).catch(err=>{
    return response.status(500).json({ Message: "Internal server error...", status: false });
  })
 
}

export const DonateBookList =(request,response,next)=>{
    Book.find({price:0}).then(result=>{
     return response.status(200).json({bookList:result,status:true});
   }).catch(err=>{
     return response.status(500).json({ Message: "Internal server error...", status: false });
   })
  
 }


 export const searchByAuther = (request,response,next)=>{
    Book.find({ author : request.body.author}).then(result=>{
        return response.status(200).json({result : result ,  message : "list" ,status : true}) 
    }).catch(err=>{
        console.log(err);
       return response.status(500).json({message : "Internal server error"});
   })
}

export const searchByBookName = (request,response,next)=>{
    Book.find({ name : request.params.name}).then(result=>{
        return response.status(200).json({result : result ,  message : "Search By Book Name" ,status : true}) 
    }).catch(err=>{
        console.log(err);
       return response.status(500).json({message : "Internal server error"});
   })
}

export const searchByKeyword =async (request, response,next) => {
  try {
    const { searchKeyword } = request.body;
    const results = await MyModel.find({ description: { $regex: searchKeyword, $options: 'i' } });
    setTimeout(() => {
      response.json(results);
    }, 3000); 
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error' });
  }
};


