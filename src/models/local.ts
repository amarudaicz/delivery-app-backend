import { ResultSetHeader } from "mysql2";
import { Local } from "../interface/local";
import { doQuery } from "../mysql/config";

export class LocalModel {
    constructor(){

    }



    public static postLocal(local:Local){
        return doQuery<ResultSetHeader>(
            'INSERT INTO locals (name, name_url, phone) VALUES(?,?,?);',
            [local.name, local.name_url, local.phone, ]
          );
    }
}