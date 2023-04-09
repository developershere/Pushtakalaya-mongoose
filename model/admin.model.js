import mongoose from "mongoose";
const AdminSchema =new mongoose.Schema({
    name: {
        type: String,
       required:true,
    },
    email: {
        type: String,
       required:true,
        trim:true,
    },
    password: {
        type: String,
        required:true
    },
    contact: {
        type: String,
       required:true
    },

});

export const Admin=mongoose.model("admin",AdminSchema);