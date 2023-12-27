import { httpError } from "../utils/httpError";
import { doQuery } from "../mysql/config";
import { Request, Response } from "express";
import { checkData } from "../utils/checkData";
import { Admin } from "../interface/admin";
import * as cloudinary from 'cloudinary'
import { Product } from "../interface/product";
import {rm} from 'fs'

export const getProducts = async (req: Request, res: Response) => {
  try {

    const table: string = req.params.table || (req as any).user?.admin_table

    console.log(table, 'NUEVA VISITA');

    if (!table) {
      return httpError(res, 'No hay tabla para consultar', 403)
    }

    //INTERFACE Product
    let data: any[] = await doQuery(
      `SELECT ${table}.id, name, stock, price, ingredients, ${table}.local_id, image, category_id, category_name, category_image, categories.active as category_active, categories.sort_order as category_sort, variations, description, fixed FROM ${table} INNER JOIN categories ON categories.id = ${table}.category_id AND categories.local_id = ${table}.local_id`,
      []
    );

    
    for (let i = 0; i < data.length; i++) {
      data[i].variations ? data[i].variations = JSON.parse(data[i].variations) : null
      data[i].ingredients ? data[i].ingredients = JSON.parse(data[i].ingredients) : null
    } 
    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, 'ERROR_GET_PRODUCTS', 403);
  } 
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { local, id } = req.params;
    const { admin_table } = (req as any).user


    const data:any[] = await doQuery(
      `SELECT ${local}.id, name, price, ingredients, category_id, category_name FROM ${local} INNER JOIN categories ON categories.id = ${local}.category_id AND categories.local_id = ${local}.local_id WHERE ${local}.id = ${Number(
        id
      )} `,
      []
    );


    if (checkData(data))
      return httpError(res, "No se han encontrado productos", 403);

    res.json(data);
  } catch (err: any) {
    // httpError(res, err, 403);
    res.status(403).json({ error: "asd" });
  }
};


export const postProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as Admin;
    const image = req.file;
    let imageUrl:any = null;
    
    const { name, price, category_id, description, variations, ingredients } = req.body as Product;
    
    if (image) {
      try {
        const imageUpload = await cloudinary.v2.uploader.upload(image.path, { 
          folder: user.admin_table,
          public_id: name.replace(' ', '-' ).trim() || name,
          overwrite: true,
          quality: 90,
          eager_async:true, 
        });

        console.log(imageUpload);
        imageUrl = imageUpload.secure_url;
        console.log('paso hasta aca');
        rm(image.path, ()=> console.log('rm->' + image.path))
      } catch (err) {
         httpError(res, 'A ocurrido un error al cargar tu imagen, intenta nuevamente en unos minutos')
      }
    }
    
      const data = await doQuery(
        `INSERT INTO ?? (name, local_id, image, price, ingredients, category_id, description, variations) VALUES(?,?,?,?,?,?,?,?)`,
        [user.admin_table, name, user.local_id, imageUrl, price, ingredients, category_id, description === 'Null' ? null : description, variations]
      );

      console.log({this:data});
      
      
    return res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {

    const { id } = req.params
    
    const { admin_table } = (req as any).user;

    console.log(id);
    
    const data = await doQuery(`DELETE FROM ${admin_table} WHERE id = ?;`, [Number(id)]);

    res.json(data);
  } catch (err: any) {
    console.log(err);
    
    httpError(res, err, 403);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const user  = (req as any).user as Admin;

    const file = req.file;
    let imageUrl:any = null;
    
    const {
      id,
      name,
      price,
      description,
      variations,
      ingredients,
      image
    } = req.body;

    

    if (file) {
      const imageUpload = await cloudinary.v2.uploader.upload(file.path, {
        folder: user.admin_table,
        public_id: name,
        overwrite: true,
        quality: 90
      });
      
      imageUrl = imageUpload.secure_url;
    }

    const data = await doQuery(
      `UPDATE ${user.admin_table} SET name=?, image=?, price=?, ingredients=?, description=?, variations=? WHERE id = ? `,
      [name, imageUrl ? imageUrl : (image === 'null' ? null : image), price, ingredients, description === 'null' ? null : description, variations, id]
    );


    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};


export const updateFixedProduct = async (req:Request, res:Response)=>{
  try{
    const user  = (req as any).user as Admin;
    const {id:idProduct, fixed} = req.body

    const data = await doQuery(`UPDATE ${user.admin_table} SET fixed = ? WHERE id = ?`, [fixed, idProduct])


    res.json(data)

  }catch(err){

  }
}


export const updateStockProduct = async (req:Request, res:Response)=>{
  try{
    const user  = (req as any).user as Admin;
    const {id:idProduct, stock} = req.body

    const data = await doQuery(`UPDATE ${user.admin_table} SET stock = ? WHERE id = ?`, [stock, idProduct])


    res.json(data)

  }catch(err){

  }
}