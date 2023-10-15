export interface Admin{
    id:number,
    username:string,
    email:string,
    password:string,
    admin_table:string,
    local_id:number,
    active:1|0,
    admin:1|0,
    root:1|0,
    register_date:Date,
    sub_id:string
    sub_type:'string',
    sub_status:1|0
}

export interface NewAdmin{
    sub_id:number
    username:string,
    last_name:string,
    name:string,
    email:string,
    password:string,
    phone:number,
    admin_table:string,
    local_id:number
    admin:1|0
}


