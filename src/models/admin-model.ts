import { ResultSetHeader } from "mysql2";
import { doQuery } from "../mysql/config";
import { Admin, NewAdmin } from "../interface/admin";

import { genSalt, hash } from "bcrypt";

export class AdminModel {
    constructor(){

    }

    public static async postAdmin(newAdmin:NewAdmin){
        console.log(newAdmin);
        
        const salt = await genSalt(10)

        newAdmin['admin'] = 1
        newAdmin['password'] = await hash(newAdmin['password'], salt)

        console.log(newAdmin);
        
        return doQuery<ResultSetHeader>(
            'INSERT INTO users SET ?;',[newAdmin]
        );
    }

  
}