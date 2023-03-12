import { Response } from 'express'

export const httpError = (res:Response, message:string, code:number) => {
    res.status(code)
    res.json({error:message})
}