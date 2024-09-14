import mysql2, { PoolOptions } from "mysql2";

// const pool = mysql2.createPool(
//   'mysql://2Nax5MMDcG1k6Cx.root:ckEzmrapsEQmmng6@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/delitienda?ssl={"rejectUnauthorized":true}'
// );

const pool = mysql2.createPool(process.env.DB_URI as PoolOptions)

export const poolConnection = () => {
  pool.getConnection((err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("R");
  });
};

export const doQuery = <T>(query: string, data: any) => {
  return new Promise<T>((resolve, reject) => {
    const formatQuery = mysql2.format(query, data);

    pool.query<any>(formatQuery, (error, results, fields) => {
      if (error) return reject(error); // <- se rechaza la promesa y s e pasa el motivo
      resolve(results); // <- se resuelve la Promesa y se pasa el resultado
    });
  });
};

// async function transfer() {
//   const tables = ['stats'];
//   for (let i = 0; i < tables.length; i++) {
//     const data: any[] = await doQuery(`SELECT * FROM ${tables[i]};`, []);
    
//    await new Promise(async (resolveOuter, rejectOuter) => {
//      for (let j = 0; j < data.length; j++) { 
//        await new Promise((resolveInner, rejectInner) => {
//          const query = `INSERT INTO ${tables[i]} SET ?`
//          const formatQuery = mysql2.format(query, data[j])
//          // const query = `INSERT INTO ${tables[i]} (name, price, image, description, ingredients, variations, stock, local_id, category_id, fixed, galery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)`;

//            // const formatQuery = mysql2.format(query, [data[j].name, data[j].price, data[j].image, data[j].description, data[j].ingredients, data[j].variations, data[j].stock, data[j].local_id, data[j].category_id, data[j].fixed, data[j].galery ]);
//            pool2.query<any>(formatQuery, (error, results, fields) => {
//              if (error) {
//                console.log(error);
//                rejectInner(error); // Rechazar la promesa interna y pasar el motivo
//             } else {
//               console.log(results);
//               resolveInner(results); // Resolver la Promesa interna y pasar el resultado
//             }
//           });
//         });
//       }
//       resolveOuter(true); // Resolver la Promesa externa después de completar todas las inserciones para una tabla
//     });
//   }
// }

// setTimeout(() => {
//    transfer();
// }, 3000);
