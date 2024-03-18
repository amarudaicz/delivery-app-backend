import { Response } from 'express'

export const httpError = (res:Response, message:string ='A ocurrido un error, intente nuevamente', code:number = 403) => {
   
    res.status(code)
    res.json(message)
}