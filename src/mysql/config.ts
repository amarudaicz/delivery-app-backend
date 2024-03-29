import mysql2, { PoolOptions } from "mysql2";


const pool = mysql2.createPool(process.env.DB_URI as PoolOptions)

//  const pool = mysql2.createPool({
//   connectionLimit: 10,
//   user: process.env.DB_USER,
//   password:process.env.DB_PASSWORD ,
//   port:Number(process.env.DB_PORT),
//   host:process.env.DB_HOST ,
//   database:process.env.DB_NAME 
//  });  
   
  
 
  
// CREATE USER 'vps3_admin'@'190.220.19.48' IDENTIFIED BY '12345678';
// GRANT ALL PRIVILEGES ON *.* TO 'vps3_admin'@'190.220.19.48' WITH GRANT OPTION;

 

export const poolConnection = async () => {
 
  pool.getConnection( async (err) => {
    if (err) { 
      console.log(err);
    } else {
      console.log("R");
    } 
  }); 
}; 

export const doQuery = <T>(query: string, data: any) => {
  return new Promise<T>((resolve, reject) => {
    const formatQuery = mysql2.format(query, data);

     pool.query<any>(formatQuery, (error, results, fields) => {
       if (error) return reject(error); // <- se rechaza la promesa y se pasa el motivo
       resolve(results); // <- se resuelve la Promesa y se pasa el resultado
      });
  });
};

