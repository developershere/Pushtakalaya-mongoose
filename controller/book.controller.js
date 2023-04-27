import { request, response } from "express";
import { Book } from "../model/book.model.js";
import { validationResult } from "express-validator";

export const saveProduct = async (request, response, next) => {
    try {
        for (let book of request.body) {
            await Book.create(book);
        }
        return response.status(200).json({ msg: "Add products Succesfully", status: true })
    } catch (err) {
        console.log(err);
        return response.status(500).json({ msg: "Internal Server Error", status: false });
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
    let page = parseInt(request.query.page) || 1;
    let perPage = 10;
   Book.find().skip((page-1)*10).limit(10).then(result=>{
    return response.status(200).json({bookList:result,status:true});
  }).catch(err=>{
    return response.status(500).json({ Message: "Internal server error...", status: false });
  })
 
}

export const TopBooks =(request,response,next)=>{
    Book.find().limit(12).then(result=>{
     return response.status(200).json({topbookList:result,status:true});
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


export const searchByCategoryId =(request,response,next)=>{
   
    Book.find({categoryId:request.body.categoryId}).then(result=>{
       return response.status(200).json({result:result,status:true})
    }).catch(err=>{
        return response.status(500).json({msg:"Internal Server Error"});
    })
}