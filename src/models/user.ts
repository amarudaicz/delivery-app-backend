import { ResultSetHeader } from "mysql2";
import { User } from "../interface/user";
import { doQuery } from "../mysql/config";

export class UserModel {
  constructor() {}

  public static getUser(id: any): Promise<User[]> {
    const searchBy = typeof id === "number" ? "id" : "username";
    
    return doQuery(`select * from users WHERE ?? = ?`, [searchBy, id]);
  }

  public static postUser(user: User): Promise<User[]> {
    return doQuery(`INSERT INTO users SET ?`, [user]);
  }
  
  public static getAllUsers(): Promise<User[]> {
    return doQuery(`select * from users`, []);
  }

  public static updateUser(user:User|any): Promise<ResultSetHeader> {
    return doQuery(`UPDATE users SET ? WHERE id = ?`, [user, user.id]);
  }

  public static async deleteUser(id:number){
    return doQuery<ResultSetHeader>(
        'DELETE FROM users WHERE id = ?;',[id]
    );
}



}
