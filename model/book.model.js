
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    language: {
        type: String,
        required: true,
    },
    edition: {
        type: String,
        required: true,
    },
    photos: {
        type: String,
        required: true,
    },
    publicationDate: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: Boolean,
        required: true

    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    },
    permission: {
        type: Boolean,
        default:false,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },

});

export const Book = mongoose.model("book", bookSchema);