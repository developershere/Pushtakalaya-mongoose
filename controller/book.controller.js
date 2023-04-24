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


export const viewByUserId=(request,response,next)=>{
    Book.find({userId:request.body.userId
    }).then((result)=>{
        return response.status(200).json({book:result,status:true});
    }).catch((err)=>{
        return response.status(500).json({msg:"Internal Server Error",status:false});
    })
}


export const searchByKeyWord = async (request,response,next)=>{
    try {
         let searchResult = await  Book.find({
             $or: [{ name: { $regex: request.params.keyword, $options: "i" } },
              { description: { $regex: request.params.keyword, $options: "i" } },
                 { author: { $regex: request.params.keyword, $options: "i" } }
             ]
         })
         if (searchResult.length > 0)
             return response.status(200).json({ Product: searchResult, status: true })
         else
             return response.status(401).json({ result: "NO result found", status: false })
     }
     catch (err) {
         console.log(err)
         return response.status(500).json({ error: err, status: false })
     }
 }

export const updateBook = async  (request,response,next)=>{
   console.log(request.body)
try{
   let user = await Book.find({userId : request.body.userId})
 if(!user)
  return response.status(404).json({error : "bed request" ,status : false})
   let updateBook = await Book.updateOne({ _id: request.body.id }, {
       name: request.body.name, price: request.body.price, author: request.body.author, pinCode: request.body.pinCode, description: request.body.description, photos: request.body.photos
  })
   console.log(updateBook)
  return response.status(200).json({message : "book update succesfully"})
 }
catch(err){
  console.log(err);
 return response.status(500).json({error : "Internal server error"});
}
}
