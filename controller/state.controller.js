import { State } from "../model/state.model.js";
export const addState = async (request, response, next) => {
    try {
        for (let name of request.body) {
            await State.create({ stateName:name});
        }
        return response.status(200).json({ msg: "States has been saved", status: true });

    } catch (err) {
        return response.status(500).json({ msg: "Internal Server Error", status: false});
}
}

export const findState = (request,response,next)=>{
    State.find().then(result=>{
        return response.status(200).json({  state : result ,Message: "States has been saved...", status: true })
    }).catch(err=>{
        return response.status(500).json({ Message: "Internal Server error...", status: false })
   })
}
