import { Request, Response } from "express";
import { httpError } from "../utils/httpError";
import * as mp from "mercadopago";
import { SuscriptionModel } from "../models/subscription-model";

export const postSubscription = async (req: Request, res: Response) => {
  try {

    console.log(req.body);
    const { token, payer } = req.body;
    
    const subscription = await SuscriptionModel.postSubscription({token, payer})
    console.log(subscription);

    
    if (!subscription.id){
        httpError(res,'ERROR_EN_EL_PAGO')
        return
    }
    
    res.json(subscription);
  } catch (err: any) {
    console.log(err);
    
    httpError(res, err);
  }
};
