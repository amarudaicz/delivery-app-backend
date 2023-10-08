import { Request, Response } from "express";
import { httpError } from "../utils/httpError";
import { UserModel } from "../models/user";
import { cleanUser } from "../utils/cleanUser";

export const getUser = async (req:Request|any, res:Response) =>{
    try {
        const {paramsId} = req.params

        const {id} = req.payload

        const user = cleanUser((await UserModel.getUser(paramsId ?? id))[0])
        console.log(user);
        

        if (!user) {
            return httpError(res, 'user not found')
        }

        res.json(user)

    } catch (err:any) {
        httpError(res, err)
    }
}

