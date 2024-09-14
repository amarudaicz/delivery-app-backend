import { RowDataPacket } from "mysql2";
import { OrderEntity, PostOrderValue } from "./orderEntity";

export interface OrderRepository {
  postOrder(order: PostOrderValue): Promise<RowDataPacket>; 
  getOrder(order_id: number): Promise<OrderEntity>;
  getOrdersByLocalId(local_id: number): Promise<OrderEntity[]>;
  putOrder(order: OrderEntity): Promise<RowDataPacket>;
  deleteOrder(order_id: number): Promise<RowDataPacket>;
  markOrdersAsWatched(orders: OrderEntity[]): Promise<RowDataPacket>|null;
}
