import { ItemCart, Order, PostOrderValue, StatusType } from "./orderEntity";

export class OrderValue implements PostOrderValue {
  constructor(order: Order) {
    this.customer_name = order.name;
    this.total_amount = order.subtotal + order.costShipping ?? 0;
    this.local_id = order.local_id;
    this.payment_method = order.payMethod;
    this.shipping_address = order.ubication;
    this.shipping_reference = order.reference;
    this.status = "pendiente";
    this.cart = JSON.stringify(order.cart);
    this.order_date = new Date();
    this.watched_admin = 0
    this.customer_phone = order.phone
    this.customer_email = order.email
  }
  
  customer_phone:number
  watched_admin: number;
  order_date: Date;
  cart: string | ItemCart[];
  status: StatusType;
  customer_name: string;
  total_amount: number;
  local_id: number;
  payment_method: string;
  shipping_address: string;
  shipping_reference: string | null;
  customer_email:string
}
