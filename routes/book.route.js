import express from "express";
import{body }from "express-validator";
import{addBook,saveProduct,removeBook,TopBooks, bookList,DonateBookList,searchByCategoryId,TotalPendingBook, searchByAuther,searchByBookName,viewByUserId,searchByKeyWord,updateBook, TotalBook, searchByuserId}from "../controller/book.controller.js"
import multer from "multer";
const router=express.Router(); 
const upload = multer({dest:"public/images"});
router.post("/add",body("name","Book Name Required").notEmpty(),
body("author").notEmpty(),
body("language").notEmpty(),
body("price").notEmpty(),
body("edition").notEmpty(),
body("photos").notEmpty(),
body("description").notEmpty(),
body("userId").notEmpty(),
body("cityId").notEmpty(),
body("pincode").notEmpty(),
body("status").notEmpty(),
body("permission").notEmpty(),
body("categoryId").notEmpty(),
body("publicationDate").notEmpty(),
upload.single("photos"),addBook);

router.post('/saveAll',saveProduct);
router.get("/topBooks",TopBooks)
router.get("/list",bookList);
router.get("/totalbook",TotalBook)
router.get("/freeBookList",DonateBookList);
router.post('/deleteBook',removeBook);
router.post('/searchbyAuthor',searchByAuther);
router.post('/searchByCategoryId',searchByCategoryId)
router.get("/searchByBookName/:name",searchByBookName);
router.post("/byuserId",viewByUserId);
router.get("/searchByKeyWord/:keyword", searchByKeyWord)
router.post("/update-book",updateBook);
router.get("/totalpendingbook",TotalPendingBook)
router.post("/serachByuserId",searchByuserId)

// some api added
export default router;