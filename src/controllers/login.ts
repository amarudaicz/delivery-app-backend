import { Router, Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import { doQuery } from "../mysql/config";
import { httpError } from "../utils/httpError";
import { Admin } from "../interface/admin";
import { cleanUser } from "../utils/cleanUser";
import { getPayload, signJwt, verifyJwt } from "../utils/handleJwt";
import { checkData } from "../utils/checkData";
import { sendEmail } from "../config/nodemailer";
import { resetPasswordTemplate } from "../templates/resetPasswordEmail";
import { formatExpiration } from "../utils/formatExpJwt";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/user";
import { User } from "../interface/user";
import { Local } from "../interface/local";
import { LocalModel } from "../models/local-model";


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = (await UserModel.getUser(username))[0]
        
        if (!user) {
            return httpError(res, 'No existe un usuario registrado', 401)
        }

        if (!user.active) {
            return httpError(res, 'Tu cuenta se encuentra inactiva por falta de pago, ponte en contacto con nosotros', 402)
        }
        
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return httpError(res, 'Contraseña incorrecta', 401)
        }

        const payload = getPayload(user)
        console.log(payload);
        
        const token = signJwt(payload)
        const exp = (verifyJwt(token) as JwtPayload).exp
        
        res.cookie('jwt', token, {httpOnly:true, secure:true}).json({token, exp})
        

    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido un error intente nuevamente', 403)
    }

}


export const register = async (req: Request|any, res: Response) => {

    try {

        let { user, local }:{user:User, local:Local} = req.body

        const salt = await bcrypt.genSalt(15)
        user.password = await bcrypt.hash(user.password, salt)

        const op:any = await doQuery(`INSERT INTO users ?`, [user])
        console.log(op);
        
        if (!op.affectedRows) return httpError(res, 'Nombre de usuario en uso', 403)

        res.status(201).json({ success: 'Usuario creado' })
    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido error', 403)

    }
}



export const sendEmailToResetPassword = async (req: Request, res: Response) => {

    try {
        //HACER TOKEN Y TODA LA BOLA 
        const {email} = req.body

        const user:Admin[] = await doQuery(`select * from users WHERE email = ?`, [email])

        console.log(user);
        
        if (!user[0]) {
            return httpError(res, 'El correo ingresado no esta registrado', 401)
        }

        const token = signJwt({id:user[0].id}, '20m')
        
        sendEmail(email, token, resetPasswordTemplate(user[0], token) )

        res.json(true)
    } catch (err) {
        console.log(err);
        httpError(res, 'ERROR_RECOVERY_PASSWORD', 403)

    }

}

export const verifyToken = async (req: Request, res: Response) => {

    try {

        const token = req.query.token as string
        
        const isValid:any = verifyJwt(token)
        console.log(isValid);
        
        if (!isValid) {
            res.json(false)
            return 
        }

        res.json(true)
    } catch (err) {
        console.log(err);
        httpError(res, 'ERROR_EN_VERIFY_TOKEN', 403)

    }

}

export const resetPassword = async (req: Request, res: Response) => {

    try {

        let password:string = req.body.password
        const token = req.headers.authorization!.split(' ')[1]

        if (!token) {
            httpError(res, 'A ocurrido un error porfavor repita el proceso')
            return
        }

        const userId = (verifyJwt(token) as any).id
        if (!userId) {
            httpError(res, 'El enlace no es valido o expiró porfavor repita el proceso')
            return
        }

        const salt = await bcrypt.genSalt(15)
        password = await bcrypt.hash(password, salt)
        
        const op = await doQuery(`UPDATE users SET password = ? WHERE id = ?;`, [password, userId])
        
        console.log(op);
        

        res.json(true)
    } catch (err) {
        console.log(err);
        httpError(res, 'ERROR_EN_VERIFY_TOKEN', 403)

    }

}