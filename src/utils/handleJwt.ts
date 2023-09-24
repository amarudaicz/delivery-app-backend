import jwt from 'jsonwebtoken'
import { User } from '../interface/user'

export const signJwt = (payload: any, expires:string = '28d') => {
    return jwt.sign(payload, process.env.SECRET_JWT!, { expiresIn:expires })
}

export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_JWT!)
    } catch (err) {
        return null
    }
}


export const getPayload = (user:User) => {
    
    return {
        id:user.id,
        local_id:user.local_id,
        admin_table:user.admin_table,
        active:user.active,
        admin:user.admin
    }

}