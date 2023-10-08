export class SuscriptionModel {

    private static baseUrlMp='https://api.mercadopago.com'

  constructor() {} 

  public static async post({ token, payer, plan_id}: { token: string; payer: any; plan_id?:string}) {

    const preferences = {
      preapproval_plan_id: plan_id || process.env.PREAPPROVAL_PLAN_ID,
      reason: "deli_subscriptor",
      external_reference: "DELI-APP",
      payer_email: payer['email'],
      card_token_id: token,
      status: "authorized",
    };

    const subStatus = await fetch(`${this.baseUrlMp}/preapproval`, {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    const subStatusJson = await subStatus.json();

    return subStatusJson;
  }


  public static async get(sub_id:string) {

    const sub = await fetch(`${this.baseUrlMp}/preapproval/${sub_id}`, {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        "Content-Type": "application/json",
      },
    });

    const subData = await sub.json();
    console.log(subData);
    
    return subData;
  }

  public static async put(body:any, sub_id:string) {

    console.log(body);
    
    const update = await fetch(`${this.baseUrlMp}/preapproval/${sub_id}`, {
      method: "PUT",
      headers: {
       Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(body)
    });

    const subUpdate = await update.json();
    return subUpdate;
  }


}
