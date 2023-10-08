export interface Subscription {
    id:                   string;
    payer_id:             number;
    payer_email:          string;
    back_url:             string;
    collector_id:         number;
    application_id:       number;
    status:               string;
    reason:               string;
    external_reference:   string;
    date_created:         Date;
    last_modified:        Date;
    init_point:           string;
    preapproval_plan_id:  string;
    auto_recurring:       AutoRecurring;
    summarized:           Summarized;
    next_payment_date:    Date;
    payment_method_id:    string;
    card_id:              string;
    first_invoice_offset: null;
}

export interface AutoRecurring {
    frequency:                number;
    frequency_type:           string;
    transaction_amount:       number;
    currency_id:              string;
    start_date:               Date;
    billing_day_proportional: boolean;
    has_billing_day:          boolean;
    free_trial:               null;
}

export interface Summarized {
    quotas:                  null;
    charged_quantity:        number;
    pending_charge_quantity: null;
    charged_amount:          number;
    pending_charge_amount:   null;
    semaphore:               string;
    last_charged_date:       Date;
    last_charged_amount:     number;
}
