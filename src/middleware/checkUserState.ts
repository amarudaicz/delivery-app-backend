import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import { httpError } from "../utils/httpError";

export const checkUserState = async ( req:Request|any, res:Response, next:NextFunction)=>{
    try {   
        const {id} = req.payload
        console.log(id);
        
        const user = (await UserModel.getUser(id))[0]   

        
        if(!user.active) return httpError(res, 'Tu cuenta se encuentra inactiva, porfavor ponte en contacto con nosotros', 401)
        if(!user.sub_id) return httpError(res, 'Tu cuenta no tiene un metodo de pago activo, porfavor ponte en contacto con nosotros', 402)


        
        req.user = user
        next()
    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido un error')
    }
}

export const insertUserRequest = async (req:Request|any, res:Response, next:NextFunction) => {
    try {   
        const {id} = req.payload
        
        const user = (await UserModel.getUser(id))[0]   
        
        req.user = user
        next()
    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido un error')
    }

}