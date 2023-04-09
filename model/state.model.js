
import mongoose from "mongoose";

const StateSchema =new mongoose.Schema({
    stateName: {
        type:String,
        required:true  
    }
});
export const State = mongoose.model("state",StateSchema);
