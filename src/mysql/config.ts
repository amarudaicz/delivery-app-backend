import mysql2 from "mysql2";

const dbUri = 'mysql://vps3_admin:Contrasenacss3@149.50.129.17:3306/vps3_deli';

const pool = mysql2.createPool({
  connectionLimit: 10,
  user: "deli",
  password: "12345678",
  port:3306,  
  host: "149.50.129.17",
  database: "vps3_deli",  
}); 
  
// CREATE USER 'vps3_admin'@'190.220.19.48' IDENTIFIED BY '12345678';
// GRANT ALL PRIVILEGES ON *.* TO 'vps3_admin'@'190.220.19.48' WITH GRANT OPTION;

 

export const poolConnection = () => {
  pool.getConnection((err) => {
    if (err) { 
      console.log(err);
    } else {
      console.log("R");
    } 
  }); 
}; 

export const doQuery = (query: string, data: any) => {
  return new Promise<any>((resolve, reject) => {
    const formatQuery = mysql2.format(query, data);

     pool.query<any>(formatQuery, (error, results, fields) => {
       if (error) return reject(error); // <- se rechaza la promesa y se pasa el motivo

       resolve(results); // <- se resuelve la Promesa y se pasa el resultado
     });
  });
};

poolConnection() 
