import { Router, Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import { doQuery } from "../mysql/config";
import { httpError } from "../utils/httpError";
import { Admin } from "../interface/admin";
import { cleanUser } from "../utils/cleanUser";
import { signJwt, verifyJwt } from "../utils/handleJwt";
import { checkData } from "../utils/checkData";


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        let user = await doQuery(`select * from users WHERE username = ?`, [username])

        if (checkData(user)) {
            return httpError(res, 'No existe un usuario registrado', 401)
        }

        const checkPassword = await bcrypt.compare(password, user[0].password)


        if (!checkPassword) {
            return httpError(res, 'Contraseña incorrecta', 401)
        }

        if (!user[0].admin) {
            user = cleanUser(user[0]) 
        }


        delete user[0].password
        const token = signJwt(user[0])
        const exp = (verifyJwt(token) as any).exp
        
        res.cookie('jwt', token, {httpOnly:true, secure:true}).json({token, exp})
        

    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido un error intente nuevamente', 403)
    }

}

export const register = async (req: Request, res: Response) => {

    try {
        const user:Admin = (req as any).user
        console.log(user);
        
        if (!user.root) {
            return httpError(res, 'No tienes permisos', 403)
        }
        
        let { username, password, admin, admin_table, local_id } = req.body

        const salt = await bcrypt.genSalt(15)
        password = await bcrypt.hash(password, salt)

        const op = await doQuery(`
        INSERT IGNORE INTO users (username, password, admin_table, local_id, admin)
        VALUES (?,?,?,?,?);`,
        [username, password, admin_table, local_id, admin || 0])

        if (!op.affectedRows) return httpError(res, 'Nombre de usuario en uso', 403)

        res.status(201).json({ success: 'Usuario creado' })
    } catch (err) {
        console.log(err);
        httpError(res, 'A ocurrido error', 403)

    }
}


export const registerAdmin = async (req: Request, res: Response) => {

    try {
        const data = req.body as Admin

        const salt = await bcrypt.genSalt(15)
        data.password = await bcrypt.hash(data.password, salt)
        const operation = await doQuery(`INSERT INTO users (username, password, admin_table, local_id) VALUES (?,?,?,?)`, [data.username, data.password, data.admin_table, data.local_id])
        console.log(operation);


        res.status(201).json(operation)

    } catch (err) {
        console.log(err);
        httpError(res, 'ERROR_REGISTER_ADMIN', 403)

    }

}