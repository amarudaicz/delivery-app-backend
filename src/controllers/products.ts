import { httpError } from '../utils/httpError';
import { doQuery } from '../mysql/config';
import { Request, Response } from 'express';
import { checkData } from '../utils/checkData';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { local } = req.params;
    const data = await doQuery(
      `SELECT ${local}.id, name, price, ingredients, id_category, category_name FROM ${local} INNER JOIN categories ON categories.id = ${local}.id_category `,
      [false]
    );
    //data[0].price = JSON.parse(data[0].price) 
    
    
    res.send(data)

  } catch (err: any) { 
    console.log(err);
    
    httpError(res, err, 403);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { local, id } = req.params;

    const data = await doQuery(
      `SELECT ${local}.id, name, price, ingredients, id_category, category_name FROM ${local} INNER JOIN categories ON categories.id = ${local}.id_category WHERE ${local}.id = ${Number(
        id
      )} `,
      [false]
    );

    if (checkData(data))
      return httpError(res, 'No se han encotrado proasdsadductos', 403);

    res.json(data);
  } catch (err: any) {
    // httpError(res, err, 403);
    res.status(403).json({ error: 'asd' });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { local } = req.params;
    const { name, price, ingredients, id_category } = req.body;
    
    console.log(req.body);

    const data = await doQuery(
      `INSERT INTO ${local} (name, price, ingredients, id_category) VALUES(?,?,?,?) `,
      [name, price, ingredients, id_category]
    );
 
    res.send(data).status(201);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id, local } = req.params;
    const data = await doQuery(`DELETE FROM ${local} WHERE id = ?;`, [id]);

    res.json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, local } = req.params;
    const { name, price, ingredients, id_category } = req.body;
    const data = await doQuery(
      `UPDATE ${local} SET name = ?, price = ? , ingredients = ?, id_category = ? WHERE id = ?;`,
      [name, price, ingredients, id_category, id]
    );
    res.json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};
