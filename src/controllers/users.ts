import { Request, Response } from "express";
import { httpError } from "../utils/httpError";
import { UserModel } from "../models/user";
import { cleanUser } from "../utils/cleanUser";
import { Admin } from "../interface/admin";
import { User } from "../interface/user";

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

export const updateUser = async (req:Request|any, res:Response) =>{
    try {
        const user:User = (req as any).user
        const newValues = req.body
        const updatedUser:User = {...user, ...newValues}
        console.log(updatedUser);
        const sqlOperation = await UserModel.updateUser(updatedUser)
        
        res.json(updatedUser)
    } catch (err:any) {
        httpError(res, err)
    }
}




