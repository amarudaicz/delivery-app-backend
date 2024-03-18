import { Order, OrderEntity } from "../domain/orderEntity";
import { OrderRepository } from "../domain/orderRepository";
import { OrderModel } from "../../models/order-model";
import { OrderValue } from "../domain/orderValue";
import { parseJson } from "../../utils/parseData";

export class OrderUseCase{
    constructor(private orderRepository:OrderRepository){

    }

    public createOrder = async (order:Order) => {
        const orderValue = new OrderValue(order)
        const orderCreated = await this.orderRepository.postOrder(orderValue)
        return orderCreated
    }

    public recoveryOrdersAdmin = async (local_id:number) => {
        const allOrders = await this.orderRepository.getOrdersByLocalId(local_id)
        const unseenOrders = allOrders.filter(o => o.watched_admin < 2)
        const idsUnseenOrders = unseenOrders.map(o => o.id)
      
        if (unseenOrders.length) {
            await this.orderRepository.markOrdersAsWatched(unseenOrders)
        }
        
        for (let i = 0; i < allOrders.length; i++) {
            if (idsUnseenOrders.includes(allOrders[i].id)){
                allOrders[i].watched_admin += 1 
            }

            allOrders[i].cart = parseJson(allOrders[i].cart as string)
        }

        console.log(allOrders);
        
        return allOrders
    }

    public deleteOrder = async (order_id:number) => {
        const deletedOrder = await this.orderRepository.deleteOrder(order_id)
        return deletedOrder
    }

    
    public putOrder = async (order:OrderEntity) => {
        const deletedOrder = await this.orderRepository.putOrder(order)
        return deletedOrder
    }
    
}