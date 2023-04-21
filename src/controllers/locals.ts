import { httpError } from '../utils/httpError';
import { doQuery } from '../mysql/config';
import { Request, Response } from 'express';

export const getLocal = async (req: Request, res: Response) => {
  try {
    const { local } = req.params;

    const data = await doQuery('SELECT * FROM locals WHERE name_url = ?;', [
      local,
    ]);
    

    if (data.length !== 0) return res.json(data);

    httpError(res, 'No se a encontrado el local', 202);
  } catch (err: any) {
    httpError(res, err, 202);
  }
};

export const getAllLocals = async (req: Request, res: Response) => {
  try {
    const data = await doQuery('SELECT * FROM locals;', [false]);
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
    const { id, name, location, contact, description } = req.body;
    const name_url: string = name.trim().toLowerCase().replace(' ', '');
    const data = await doQuery(
      'UPDATE locals SET name = ?, name_url = ? , location = ?, contact = ?, description = ? WHERE id = ?;',
      [name, name_url, location, contact, description, id]
    );
    res.json(data);
  } catch (err: any) {
    httpError(res, err, 403);
  }
};


export const createTableLocal = async (req: Request, res: Response) => {

    try {

        const {name} = req.body
        const nameTable:string = name.trim().toLowerCase().replace(' ', '')

        const data = await doQuery(
            `CREATE TABLE ${nameTable} (id serial NOT NULL, name varchar(255) NOT NULL,price longtext NOT NULL,ingredients longtext DEFAULT NULL,id_category int(11) NOT NULL, createdAt datetime DEFAULT  CURRENT_TIMESTAMP(), FOREIGN KEY (id_category) REFERENCES categories(id));`,
            [false]
        )


        res.send('ok')


    } catch (err: any) {
      httpError(res, err, 403);
    }
  };
  
  