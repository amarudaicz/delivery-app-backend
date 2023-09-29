export class SuscriptionModel {

    private static baseUrlMp='https://api.mercadopago.com'

  constructor() {} 

  public static async postSubscription({ token, payer, plan_id}: { token: string; payer: any; plan_id?:string}) {

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
}
