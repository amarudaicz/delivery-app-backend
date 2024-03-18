//INFRAESTRUCTURA PUEDE CONOCER DEPENDENCIAS COMO MODELS
import { RowDataPacket } from "mysql2";
import { PostOrderValue, OrderEntity } from "../../domain/orderEntity";
import { OrderRepository } from "../../domain/orderRepository";
import { OrderModel } from "../../../models/order-model";
import { doQuery } from "../../../mysql/config";

export class MysqlRepository implements OrderRepository{
 
    async postOrder(order: PostOrderValue): Promise<RowDataPacket> {    
        return await OrderModel.insertOrder(order)
    }

    async getOrder(order_id: number): Promise<OrderEntity> {
        return await OrderModel.selectOrder(order_id)
    }

    async getOrdersByLocalId(local_id: number): Promise<OrderEntity[]> {
        return await OrderModel.selectByLocalId(local_id)
    }

    async putOrder(order: OrderEntity): Promise<RowDataPacket> {
        return await OrderModel.updateOrder(order)
    }

    async deleteOrder(order_id: number): Promise<RowDataPacket> {
        return await OrderModel.deleteById(order_id)
    }

    async markOrdersAsWatched(orders: OrderEntity[]): Promise<RowDataPacket> {
        const ids = orders.map(o=>o.id).join(',')
        const idsArray = ids.split(',').map(Number); // Convertir la cadena en un array de números
        return await OrderModel.updateOrdersAsWatched(idsArray, orders[0].watched_admin);
    }

}