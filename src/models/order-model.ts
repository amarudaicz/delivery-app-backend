import { RowDataPacket } from "mysql2";
import { doQuery } from "../mysql/config";
import { Order, OrderEntity, PostOrderValue } from "../orders/domain/orderEntity";

export class OrderModel {
  constructor() {}

  static async insertOrder(order: PostOrderValue) {
    return doQuery<RowDataPacket>("INSERT INTO orders SET ?", [order]);
  }

  static async selectOrder(id: number) {
    return doQuery<OrderEntity>("SELECT * FROM orders WHERE id = ?", [id]);
  }

  static async updateOrder(order: OrderEntity) {
    return doQuery<RowDataPacket>("UPDATE orders SET ? WHERE id = ?", [order, order.id]);
  }

  static async deleteById(id: number) {
    return doQuery<RowDataPacket>("DELETE FROM orders WHERE id = ?", [id]);
  }

  static async selectByLocalId(local_id: number) {
    return await doQuery<OrderEntity[]>("SELECT * FROM orders WHERE local_id = ?", [local_id]);
  }

  static async updateOrdersAsWatched(multiple_id:any, watched_admin:number) {
    console.log(multiple_id, watched_admin);
    
    return await doQuery<RowDataPacket>("UPDATE orders SET watched_admin = ? WHERE id IN(?)", [watched_admin + 1, multiple_id]);
  }
}
