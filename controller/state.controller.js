import { State } from "../model/state.model.js";
import {City} from "../model/city.model.js";
import { response } from "express";

export const addState = (request, response, next) => {
    for (let stateName of request.body) {
        State.create({ stateName })
            .then(result => {
                return response.status(200).json({ Message: "States has been saved...", status: true });
            })
            .catch(err => {
                console.log(err);
                return response.status(500).json({ Message: "Internal Server error...", status: false })
            })
    }

}

export const stateList = (request, response, next) => {
    State.find().then(result => {
        return response.status(200).json({ StareList: result, status: true });
    }).catch(err => {
        return response.status(500).json({ Message: "Internal server error...", status: false });
    })
}


