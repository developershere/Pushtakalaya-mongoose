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
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    }
}

export const TopBooks = (request, response, next) => {
    Book.find().limit(10).then(result => {
        return response.status(200).json({ topbookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

export const addBook = async (request, response, next) => {
    try {

        let name = request.body.name;
        let description = request.body.description;
        let author = request.body.author;
        let price = request.body.price;
        let categoryId = request.body.categoryId;
        let language = request.body.language;
        let edition = request.body.edition;
        let photos = request.file.filename;
        let publicationDate = request.body.publicationDate;
        let userId = request.body.userId;
        let cityId = request.body.cityId;
        let pincode = request.body.pincode;
        let error = await validationResult(request.body);
        if (!error.isEmpty())
            return response.status(400).json({ Error: "Bad request ", Message: error.array() });
        await Book.create({ name, description, author, price, categoryId, language, edition, photos, publicationDate, userId, cityId, pincode }) ? response.status(200).json({ Message: "Book has been saved ...", status: true }) : response.status(500).json({ Message: "Internal Server error...", status: false })

    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }
}

export const removeBook = async (request, response, next) => {
    try {
        let book = await Book.updateOne({ id: request.params.id }, { status: false });
        console.log("Book Remove : " + book);
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ Message: "Internal server error...", status: false });
    }
}

export const bookList = (request, response, next) => {
    Book.find().then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

export const DonateBookList = (request, response, next) => {
    Book.find({ price: 0 }).then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })

}
export const searchByCategoryId = async (request, response, next) => {
    try {
        let status = await Book.find({ categoryId: request.body.categoryId });
        status ? response.status(200).json({ result: status, status: true }) : response.status(400).json({ Message: "Bed Request...", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ Message: "Internal Server Error", status: false });
    }
}

export const searchByAuther = (request, response, next) => {
    Book.find({ author: request.body.author }).then(result => {
        return response.status(200).json({ result: result, message: "list", status: true })
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal server error" });
    })
}

export const searchByBookName = (request, response, next) => {
    Book.find({ name: request.params.name }).then(result => {
        return response.status(200).json({ result: result, message: "Search By Book Name", status: true })
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ message: "Internal server error" });
    })
}


export const viewByUserId = (request, response, next) => {
    Book.find({
        userId: request.body.userId
    }).then((result) => {
        return response.status(200).json({ book: result, status: true });
    }).catch((err) => {
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    })
}


export const searchByKeyword = async (request, response, next) => {
    try {
        let searchResult = await Book.find({
            $or: [{ name: { $regex: request.body.keyword, $options: "i" } },
            { description: { $regex: request.body.keyword, $options: "i" } },
            { author: { $regex: request.body.keyword, $options: "i" } }
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

export const updateBook = async (request, response, next) => {
    try {
        let user = await Book.find({ userId: request.body.userId })
        if (!user)
            return response.status(404).json({ error: "bed request", status: false })
        let updateBook = await Book.updateOne({ _id: request.body.id }, {
            name: request.body.name, price: request.body.price, author: request.body.author, pinCode: request.body.pinCode, description: request.body.description, photos: request.body.photos
        })
        console.log(updateBook)
        return response.status(200).json({ message: "book update succesfully" })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}