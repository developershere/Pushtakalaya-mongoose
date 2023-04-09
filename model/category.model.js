import mongoose from "mongoose";


const CategorySchema =new mongoose.Schema({
    categoryName: {
        type: String,
         required:true
    }
});

export const Category=mongoose.model("category",CategorySchema);