import mysql2 from 'mysql2';

const pool = mysql2.createPool({
  connectionLimit: 10,
  user: 'root',
  password: '',
  host: 'localhost',
  database: 'deli_app',
});

export const poolConnection = () => {
  pool.getConnection((err) => {
    if (err) {
      console.log(err);
    }

    console.log('R');
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