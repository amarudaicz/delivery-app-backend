import { httpError } from '../utils/httpError';
import { doQuery } from '../mysql/config';
import { Request, Response } from 'express';
import { checkData } from '../utils/checkData';

export const getLocal = async (req: Request, res: Response) => {

  try {
    const table = req.params.local || (req as any).user?.admin_table

    if (!table) return httpError(res, 'No hay tabla para consultar', 403)

    const data = await doQuery('SELECT * FROM locals WHERE name_url = ?;', [
      table,
    ]);


    if (checkData(data)) {
      return httpError(res, 'No se a encontrado el local', 202);
    }

    data[0].horarios ? data[0].horarios = JSON.parse(data[0].horarios): null
    data[0].options_group ? data[0].options_group = JSON.parse(data[0].options_group): null
    console.log({ esto: data });


    res.json(data);

  } catch (err: any) {
    console.log(err);

    httpError(res, err, 403);
  }

};

export const getAllLocals = async (req: Request, res: Response) => {
  try {
    const data = await doQuery('SELECT * FROM locals;', []);
    res.json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};

export const postLocal = async (req: Request, res: Response) => {
  try {
    const { name, location, contact, description } = req.body;

    const name_url: string = name.trim().toLowerCase().replace(' ', '');

    const data = await doQuery(
      'INSERT INTO locals (name, name_url, location, contact, description) VALUES(?,?,?,?,?);',
      [name, name_url, location, contact, description]
    );

    res.status(201).json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};

export const deleteLocal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await doQuery('DELETE FROM locals WHERE id = ?;', [id]);
    res.json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};

export const updateLocal = async (req: Request, res: Response) => {

  try {

    const user = (req as any).user
    console.log(req.body);
    

    const { id, name, location, description, horarios, aliascbu, pick_in_local, delivery_cost, delivery_time, instagram, maps, website, phone, image, options } = req.body;
    // const name_url: string = name.trim().toLowerCase().replace(' ', '');

    if (options) {
      const data = await doQuery(
        `UPDATE locals SET 
        options_group = ?
    
        WHERE id = ?;`,
        [JSON.stringify(options), user.local_id]
      );

      res.json(data)
      return
    }


    const data = await doQuery(
      `UPDATE locals SET 
      name = ?, 
      location = ?, 
      phone = ?, 
      description = ?, 
      image = ?, 
      horarios = ?, 
      delivery_cost = ?, 
      delivery_time = ?,
      aliascbu = ?,
      pick_in_local = ?,
      instagram = ?, 
      maps=?,
      website= ? 
      WHERE id = ?;`,
      [name, location, phone, description, image, JSON.stringify(horarios), delivery_cost, delivery_time, aliascbu, pick_in_local, instagram, maps, website, user.local_id]
    );

    res.json(data);
  } catch (err: any) {
    console.log(err);

    httpError(res, 'ERROR', 403);
  }
};


export const createTableLocal = async (req: Request, res: Response) => {

  try {

    const { name } = req.body
    const nameTable: string = name.trim().toLowerCase().replace(' ', '')

    const data = await doQuery(
      `CREATE TABLE ${nameTable} (id serial NOT NULL, name varchar(255) NOT NULL,price longtext NOT NULL,ingredients longtext DEFAULT NULL,id_category int(11) NOT NULL, createdAt datetime DEFAULT  CURRENT_TIMESTAMP(), FOREIGN KEY (id_category) REFERENCES categories(id));`,
      [false]
    )


    res.send('ok')


  } catch (err: any) {
    httpError(res, err, 403);
  }
};



export const getRecents = async (req: Request, res: Response) => {

  try {

    const { recents } = req.body

    const data = await doQuery(
      `SELECT *
      FROM locals
      WHERE id IN (${recents.join(', ')})`,
      []
    )

    console.log(data);
    

    for (let i = 0; i < data.length; i++) {
      data[i].horarios = JSON.parse(data[i].horarios)
    }


    res.send(data)

  } catch (err: any) {
    console.log(err);
    
    httpError(res, err, 403);
  }
};

