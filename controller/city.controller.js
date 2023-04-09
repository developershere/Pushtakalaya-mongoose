
import { City } from "../model/city.model.js";

export const addCity =(request,response,next)=>{
    City.create({stateId:request.body.id,name:request.body.name}).then(result=>{
        return response.status(200).json({msg:"City Added SuccesFully",status:true});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({msg:"Internal Server Error",status:false});
    })
}