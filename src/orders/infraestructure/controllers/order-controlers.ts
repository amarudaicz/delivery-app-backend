import { Request, Response } from "express"
import { OrderUseCase } from "../../aplication/orderUseCase"
import { Order, OrderEntity } from "../../domain/orderEntity"
import { User } from "../../../interface/user"
import { httpError } from "../../../utils/httpError"

export class OrderController{


    constructor(private orderUseCase:OrderUseCase){

    }

    public postOrder = async (req:Request, res:Response) => {
        try {
            const order:Order = req.body as any
            console.log(order);
            
            const orderCreated = await this.orderUseCase.createOrder(order)
            res.json(orderCreated)
        }

        catch(err){
            httpError(res, err as string)
            console.log(err);
            
            
        }
    }

    
    public getOrdersByLocalId = async (req:Request, res:Response) => {
        try {
            const {user}:{user:User} = req as any

            const orders = await this.orderUseCase.recoveryOrdersAdmin(user.local_id)
                
            res.json(orders)
        }

        catch(err){
            console.log(err);
            httpError(res)
            
        }
    }

    public deleteById = async (req:Request, res:Response) => {
        try {
            const {order_id} = req.params
            const deletedOrder = await this.orderUseCase.deleteOrder(Number(order_id))
            res.json(deletedOrder)
        }

        catch(err){
            httpError(res)
            
        }
    }

    public putOrder = async (req:Request, res:Response) => {
        try {
            const order:OrderEntity = req.body
            const updatedOrder = await this.orderUseCase.putOrder(order)
            res.json(updatedOrder)
        }

        catch(err){
            console.log(err);
            
            httpError(res)
        }
    }

}