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




export const addBook = async (request, response, next) => {
    try {
        console.log("add book");
        console.log(request.file);
        let name = request.body.name;
        let description = request.body.description;
        let author = request.body.author;
        let price = request.body.price;
        let categoryId = request.body.categoryId;
        let language = request.body.language;
        let edition = request.body.edition;
        let photos = "Pustakalaya@"+request.file.filename;
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
        let updateBook = await Book.findById(request.body.id)
        if (updateBook) {
            updateBook.status = request.body.status || ubook.status
            const category = await ubook.save();
            return response.status(200).json({ result: category, message: "Category update succesfully" })
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }
}

export const bookList = (request, response, next) => {
    let page = parseInt(request.query.page) || 1;
    let perPage = 10;
    Book.find().skip((page - 1) * 10).limit(10).then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })

}


export const TotalBook = (request, response, next) => {
   
    Book.find().then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })

}

export const TopBooks = (request, response, next) => {
    Book.find().limit(12).then(result => {
        return response.status(200).json({ topbookList: result, status: true });
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


export const searchByAuther = (request, response, next) => {
    Book.find({ author: request.body.author }).then(result => {
        console.log(result);
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


export const searchByCategoryId = (request, response, next) => {

    Book.find({ categoryId: request.body.categoryId}).then(result => {
        console.log(result);
        return response.status(200).json({ result: result, status: true })
    }).catch(err => {
        return response.status(500).json({ msg: "Internal Server Error" });
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


export const searchByKeyWord = async (request, response, next) => {
    try {
        let searchResult = await Book.find({
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

export const updateBook = async (request, response, next) => {
  
    try {
        let ubook = await Book.findById(request.body.id)
        if (ubook) {
            ubook.name = request.body.name || ubook.name,
                ubook.price = request.body.price || ubook.price,
                ubook.author = request.body.author || ubook.author,
                ubook.pincode = request.body.pincode || ubook.pincode,
                ubook.description = request.body.description || ubook.description
                ubook.photos = request.body.photos || ubook.photos,
                ubook.cityId = request.body.cityId || ubook.cityId
                ubook.categoryId = request.body.categoryId || ubook.categoryId,
                ubook.stateId = request.body.stateId || ubook.stateId,
                ubook.userId = request.body.userId || ubook.userId,
                ubook.edition = request.body.edition || ubook.edition,
                ubook.status = request.body.status || ubook.status,
                ubook.language = request.body.language || ubook.language,
                ubook.permission= request.body.permission || ubook.permission,
                ubook.publicationDate = request.body.publicationDate || ubook.publicationDate

        }

        const updated = await ubook.save()
        console.log(updated);
        return response.status(200).json({ result: updated, message: "book update succesfully" })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}

export const TotalPendingBook=(request,response,next)=>{
    Book.find({ permission: false }).then(result => {
        return response.status(200).json({ bookList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}

