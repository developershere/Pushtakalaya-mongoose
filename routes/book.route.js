import express from "express";
import { body } from "express-validator";
import { addBook, saveProduct, removeBook, bookList, DonateBookList, searchByAuther, searchByBookName,searchByCategoryId, TopBooks, searchByKeyword } from "../controller/book.controller.js"
import multer from "multer";
const router = express.Router();
const upload = multer({dest:"public/images"});
router.post("/add",body("name", "Book Name Required").notEmpty(),
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

router.post('/saveAll', saveProduct);

router.get("/topBooks",TopBooks);

router.get("/list", bookList);
router.get("/freebooklist", DonateBookList);
router.get('/delete-book/:id', removeBook);
router.post('/search', searchByAuther);
router.get("/searchByBookName/:name", searchByBookName);

router.post("/searchByCategoryId",searchByCategoryId);
router.post("/searchByKeyword",searchByKeyword);

export default router;