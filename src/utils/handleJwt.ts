import jwt from 'jsonwebtoken'

export const    signJwt = (payload: any) => {
    return jwt.sign(payload, process.env.SECRET_JWT as string, { expiresIn:'28d' })

}

export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, process.env.SECRET_JWT as string)
    } catch (err) {
        return null
    }
}
