import { Request, Response } from "express";
import { httpError } from "../utils/httpError";
import * as mp from "mercadopago";
import { SubscriptionModel } from "../models/subscription-model";
import { AdminModel } from "../models/admin-model";
import { LocalModel } from "../models/local-model";

export const postSubscription = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { token, payer, store, user } = req.body;

    const subscription: { id: string; payer_id: number } =
      await SubscriptionModel.post({ token, payer });
    console.log(subscription);

    if (!subscription.id) {
      httpError(res, "ERROR_EN_EL_PAGO");
      return;
    }

    const local = await LocalModel.postLocal(store);
    const tableProducts = await LocalModel.createTableProducts(store.name_url);
    const admin = await AdminModel.postAdmin({
      ...user,
      local_id: local.insertId,
      admin_table: store.name_url,
      sub_id: subscription.id,
    });

    res.json({ exit: true });
  } catch (err: any) {
    console.log(err);
    httpError(res, err);
  }
};

export const getSubscription = async (req: Request | any, res: Response) => {
  try {
    const { sub_id } = req.user;

    const sub = await SubscriptionModel.get(sub_id);

    res.json(sub);
  } catch (err:any) {
    console.log(err);
    httpError(res, err)
  }
};

export const putSubscription = async (req: Request | any, res: Response) => {
  try {
    const {sub_id} = req.user;
    const {status} = req.body

    const subUpdate = await SubscriptionModel.put({status}, sub_id);

    console.log(subUpdate);
    
    if (!subUpdate.id) {
      httpError(res, subUpdate.message)
      return
    }

    res.json(subUpdate);
  } catch (err:any) {
    console.log(err);
    httpError(res, err)
  }
};


