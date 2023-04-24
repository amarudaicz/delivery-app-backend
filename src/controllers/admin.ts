import { httpError } from '../utils/httpError';
import { doQuery } from '../mysql/config';
import { Request, Response } from 'express';

export const postCategory = async (req: Request, res: Response) => {
  try {


    const {category_name, category_image, local_id} = req.body

    const data = await doQuery(`INSERT INTO categories (category_name, category_image, local_id) VALUES(?,?,?)`, [category_name, category_image, local_id])
    

    res.send(data).status(200)


  } catch (err: any) {
    httpError(res, err, 202);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {

    const {id:local_id} = req.params

    const data = await doQuery(`SELECT * FROM categories WHERE local_id = ? `, [local_id])
  
    res.send(data).status(200)

  } catch (err: any) {
    httpError(res, err, 202);
  }
};

  
  
  
  