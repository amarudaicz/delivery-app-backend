import { ResultSetHeader } from "mysql2";
import { Local, NewLocal } from "../interface/local";
import { doQuery } from "../mysql/config";
import { Product } from "../interface/product";

export class LocalModel {
  constructor() {}
 
  public static getLocal(name_url: NewLocal) {
   
    return doQuery<Local[]>('SELECT * FROM locals WHERE name_url = ? AND active = 1 ;', [
      name_url,
    ])
  }


  public static postLocal(newLocal: NewLocal) {
    return doQuery<ResultSetHeader>("INSERT INTO locals SET ?", [newLocal]);
  }

  public static async deleteLocal(id:number){
    return doQuery<ResultSetHeader>(
        'DELETE FROM locals WHERE id = ?;',[id]
    );
  }

  public static deleteTableProducts(admin_table:string){
    return doQuery('DROP TABLE ??', [admin_table])
  }

  public static createTableProducts(name_url: string) {
    return doQuery<ResultSetHeader>(
      `CREATE TABLE ?? (
                id int(11) NOT NULL AUTO_INCREMENT,
                name varchar(255) NOT NULL,
                price int(10) NOT NULL,
                image varchar(255) DEFAULT NULL,
                description varchar(150) DEFAULT NULL,
                ingredients longtext DEFAULT NULL,
                variations longtext DEFAULT NULL,
                stock tinyint(1) NOT NULL DEFAULT 1,
                local_id int(11) NOT NULL,
                category_id int(11) NOT NULL,
                PRIMARY KEY (id),
                KEY id_category (category_id),
                KEY local_id (local_id)
            );

        
        `,
      [name_url]
    );
  }

  public static async getProducts(local_id:number){
    return await doQuery<Product[]>(
      `SELECT 
      products.id, name, stock, price, ingredients, products.local_id, image,
        category_id, category_name, category_image,
        categories.active as category_active, categories.sort_order as category_sort,
        variations, description, fixed, galery
      FROM
        products
      INNER JOIN 
        categories ON categories.id = products.category_id AND categories.local_id = products.local_id
      WHERE
        products.local_id = ?;`,
      [local_id]
    );
  }


}

// ALTER TABLE ${name_url}
//             ADD PRIMARY KEY (id),
//             ADD KEY id_category (category_id),
//             ADD KEY local_id (local_id);

//         ALTER TABLE ${name_url}
//             ADD CONSTRAINT ${name_url}_ibfk_1 FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE NO ACTION,
//             ADD CONSTRAINT ${name_url}_ibfk_2 FOREIGN KEY (local_id) REFERENCES locals (id) ON DELETE NO ACTION ON UPDATE NO ACTION; 