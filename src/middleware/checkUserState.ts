import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/user";
import { httpError } from "../utils/httpError";

export const checkUserState = async ( req:Request|any, res:Response, next:NextFunction)=>{
    try {   
        const {id} = req.user
        const user = (await UserModel.getUser(id))[0]   
        
        if(!user.active) return httpError(res, 'Tu cuenta se encuentra inactiva, porfavor ponte en contacto con nosotros', 401)
        if(!user.subscription_status) return httpError(res, 'Tu cuenta se encuentra inactiva por falta de pago, porfavor ponte en contacto con nosotros', 402)
        
        req.user = user
        next()

    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido un error')
    }
}