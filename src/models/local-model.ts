import { ResultSetHeader } from "mysql2";
import { Local, NewLocal } from "../interface/local";
import { doQuery } from "../mysql/config";

export class LocalModel {
  constructor() {}

  public static postLocal(newLocal: NewLocal) {
    return doQuery<ResultSetHeader>("INSERT INTO locals SET ?", [newLocal]);
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
}

// ALTER TABLE ${name_url}
//             ADD PRIMARY KEY (id),
//             ADD KEY id_category (category_id),
//             ADD KEY local_id (local_id);

//         ALTER TABLE ${name_url}
//             ADD CONSTRAINT ${name_url}_ibfk_1 FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE NO ACTION,
//             ADD CONSTRAINT ${name_url}_ibfk_2 FOREIGN KEY (local_id) REFERENCES locals (id) ON DELETE NO ACTION ON UPDATE NO ACTION; 