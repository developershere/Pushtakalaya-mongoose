import { request, response } from "express";
import { Category } from "../model/category.model.js";

export const addCategory = async (request, response, next) => {
    try {
        for (let category of request.body) {
            await Category.create({ categoryName: category });
        }
        return response.status(200).json({ msg: "Add Category Succesfully", status: true });

    } catch (err) {
        return response.status(500).json({ msg: "Internal Server Error", status: false });
    }
}


export const list = (request, response, next) => {
    Category.find().then(result => {
        return response.status(200).json({ category: result, msg: "category List", status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false })
    })
}

export const removeCategory = async (request, response, next) => {
    try {
        let category = await Category.findById(request.params.id);
        if (!category)
            return response.status(404).json({ err: "Resource not found", status: false })
        category.deleteOne({ id: request.params.id }) ? response.status(200).json({ msg: "Categoty Remove Succesfully", status: true }) : response.status(404).json({ err: "Request Resource Not Found", status: false });
    } catch (err) {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }
}


//check this api
export const editCategory = async (request, response, next) => {
    try {
        let category = await Category.findById(request.body.id);
        console.log(category)
        if (!category)
            return response.status(404).json({ err: "Resource not found", status: false })
            category.updateOne({id :request.body.id},{$set : {categoryName : request.body.categoryName}})
            ? response.status(200).json({ msg: "Categoty Update Succesfully", status: true }) : response.status(404).json({ err: "Request Resource Not Found", status: false });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internal Server Error", status: false });
    }
}

