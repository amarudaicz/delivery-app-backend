import { httpError } from '../utils/httpError';
import { doQuery } from '../mysql/config';
import { Request, Response } from 'express';
import { checkData } from '../utils/checkData';
import { Admin } from '../interface/admin';
import { parseJson } from '../utils/parseData';
import { Local, NewLocal } from '../interface/local';
import { LocalModel } from '../models/local-model';

export const getLocal = async (req: Request, res: Response) => {

  try {
    const table = req.params.local || (req as any).user?.admin_table

    if (!table) return httpError(res, 'No hay tabla para consultar', 403)

    const data:Local[] = await doQuery('SELECT * FROM locals WHERE name_url = ?;', [
      table,
    ]);


    if (checkData(data)) {
      return httpError(res, 'No se a encontrado el local', 403);
    }

    data[0].schedules ? data[0].schedules = JSON.parse(data[0].schedules): null
    data[0].options_group ? data[0].options_group = JSON.parse(data[0].options_group): null
    data[0].links = parseJson(data[0].links)
    data[0].shipping = parseJson(data[0].shipping)
    data[0].pay_methods = parseJson(data[0].pay_methods)


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
    const newLocal = req.body as NewLocal;
    const insertLocal = await LocalModel.postLocal(newLocal)

    const createTable = await LocalModel.createTableProducts(newLocal.name_url)

    console.log(insertLocal);
    console.log(createTable);
    

    res.status(201).json(insertLocal);

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


export const putLocal = async (req: Request, res: Response) => {

  try {

    const user = (req as any).user
    const updateFields:any = {}

    for (const field in req.body){
      if ((field === 'options' || field === 'schedules' || field ===  'links' || field ===  'shipping'||field === 'pay_methods'))
      updateFields[field] = JSON.stringify(req.body[field])
      else  
      updateFields[field] = req.body[field];
    }

    const data = await doQuery(
      `UPDATE locals SET ?
      WHERE id = ?;`,
      [updateFields, user.local_id]
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
      `CREATE TABLE ? (id serial NOT NULL, name varchar(255) NOT NULL,price longtext NOT NULL,ingredients longtext DEFAULT NULL,id_category int(11) NOT NULL, createdAt datetime DEFAULT  CURRENT_TIMESTAMP(), FOREIGN KEY (id_category) REFERENCES categories(id));`,
      [nameTable]
    )


    res.send('ok')


  } catch (err: any) {
    httpError(res, err, 403);
  }
};


export const putSchedules = async (req: Request, res: Response) => {

  try {

    const { schedules } = req.body
    const admin = ((req as any).user) as Admin

    const data = await doQuery(
      `UPDATE locals SET schedules = ? WHERE id = ?`,[JSON.stringify(schedules), admin.local_id]
    )

    
    res.send(data)

  } catch (err: any) {
    console.log(err);
    
    httpError(res, err, 403);
  }
};

export const putLinks = async (req: Request, res: Response) => {

  try {

    const { links } = req.body
    const admin = ((req as any).user) as Admin

    const data = await doQuery(
      `UPDATE locals SET links = ? WHERE id = ?`,[JSON.stringify(links), admin.local_id]
    )

    
    res.send(data)

  } catch (err: any) {
    console.log(err);
    
    httpError(res, err, 403);
  }
};




export const getRecents = async (req: Request, res: Response) => {

  try {

    const { recents }:{recents:number[]} = req.body

    if (checkData(recents)) {
      res.json([])
      return
    }
    
    const placeholders = recents.map(()=>'?').join(',')

    const data:Local[] = await doQuery(
      `SELECT *
      FROM locals
      WHERE id IN (${recents.join(',')})`,
      []
    )
    
    for (let i = 0; i < data.length; i++) {
      data[i].schedules = parseJson(data[i].schedules)
      data[i].pay_methods = parseJson(data[i].pay_methods)
      data[i].shipping = parseJson(data[i].shipping)
    }

 
    res.json(data) 

  } catch (err: any) {
    console.log(err);
    
    httpError(res, err, 403);
  }
};


export const isPathAvailable = async (req:Request, res:Response) => {

  const {path} = req.params

  const localWhitPath:number[] = await doQuery('SELECT id FROM locals WHERE name_url = ?', [path])
  console.log(localWhitPath);
  
  if (!localWhitPath[0]) {
    return res.json(true)
  }

  res.json(false)

}