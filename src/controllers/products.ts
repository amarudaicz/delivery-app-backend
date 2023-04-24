import { httpError } from "../utils/httpError";
import { doQuery } from "../mysql/config";
import { Request, Response } from "express";
import { checkData } from "../utils/checkData";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    const data = await doQuery(
      `SELECT ${table}.id, name, price, ingredients, ${table}.local_id, image, category_id, category_name, category_image, variations, description FROM ${table} INNER JOIN categories ON categories.id = ${table}.category_id AND categories.local_id = ${table}.local_id`,
      []
    );

    for (let i = 0; i < data.length; i++) {
      data[i].variations = JSON.parse(data[i].variations)
      data[i].ingredients = JSON.parse(data[i].ingredients)
    }

    res.send(data);
  } catch (err: any) {
    console.log(err);

    httpError(res, err, 403);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { local, id } = req.params;

    console.log(req.params);
    
    const data = await doQuery(
      `SELECT ${local}.id, name, price, ingredients, category_id, category_name FROM ${local} INNER JOIN categories ON categories.id = ${local}.category_id AND categories.local_id = ${local}.local_id WHERE ${local}.id = ${Number(
        id
      )} `,
      [false]
    );
    console.log(data);
    

    if (checkData(data))
      return httpError(res, "No se han encotrado productos", 403);

    res.json(data); 
  } catch (err: any) {
    // httpError(res, err, 403);
    res.status(403).json({ error: "asd" });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const { local } = req.params;

    const {
      name,
      price,
      ingredients,
      category_id,
      description,
      variations,
      local_id,
      image
    } = req.body;

    console.log(req.body);

    const data:any[] = await doQuery(
      `INSERT INTO ${local} (name, local_id, image, price, ingredients, category_id, description, variations) VALUES(?,?,?,?,?,?,?,?) `,
      [name, local_id, image, price, JSON.stringify(ingredients), category_id, description, JSON.stringify(variations)]
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
    const { local } = req.params;

    const {
      id,
      name,
      price,
      ingredients,
      category_id,
      description,
      variations,
      local_id,
      image
    } = req.body;
    
    console.log(req.body);
    
    const data = await doQuery(
      `UPDATE ${local} SET name=?, image=?, price=?, ingredients=?, category_id=?, description=?, variations=?, local_id=? WHERE id = ? `,
      [name, image, price, ingredients, category_id, description, JSON.stringify(variations), local_id ,id]
    );
 
    res.json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};
