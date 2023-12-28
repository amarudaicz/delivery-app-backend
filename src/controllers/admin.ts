import { httpError } from '../utils/httpError';
import { doQuery } from '../mysql/config';
import { Request, Response } from 'express';
import { Option, Product, Variation } from '../interface/product';
import { User } from '../interface/user';
import * as cloudinary from 'cloudinary'
import { Admin, NewAdmin } from '../interface/admin';
import * as fs from 'fs';
import {genSalt, hash} from 'bcrypt';
import { AdminModel } from '../models/admin-model';
import { UserModel } from '../models/user';
import { LocalModel } from '../models/local-model';
import { SubscriptionModel } from '../models/subscription-model';







export const getProducts = async (req: Request, res: Response) => {
  try {

    const table: string = (req as any).user?.admin_table

    if (!table) {
      return httpError(res, 'No hay tabla para consultar', 403)
    }

    //INTERFACE Product
    let data: any[] = await doQuery(
      `SELECT ??.id, name, stock, price, ingredients, ??.local_id, image, category_id, category_name, category_image, categories.active as category_active, categories.sort_order as category_sort, variations, description, fixed FROM ?? INNER JOIN categories ON categories.id = ??.category_id AND categories.local_id = ??.local_id`,
      [table, table, table,table, table]
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















export const postCategory = async (req: Request, res: Response) => {
  try {

    const {category_name, category_description,image, sort_order} = req.body
    const {local_id, admin_table} = (req as any).user
  

    const data = await doQuery(`INSERT INTO categories (category_name, category_image,category_description, sort_order, local_id) VALUES(?,?,?,?,?)`, [category_name, image,category_description, sort_order, local_id])
    

    res.send(data).status(200)


  } catch (err: any) {
    httpError(res, err, 202);
  }
};


export const updateCategory = async (req: Request, res: Response) => {
  try {

    const {category_name, category_description , id, sort_order } = req.body
    let {image} = req.body
    image = image  !== 'null' ? image : null
    
    
    const {local_id, admin_table} = (req as any).user
    
    const file = req.file
    
    let imageUrlCloudinary:null|string = null

    if (file){
      const imageUpload = await cloudinary.v2.uploader.upload(file.path, {
        folder: admin_table,
        public_id: category_name.replace(' ', '-' ).trim() || name,
        overwrite: true,
        quality: 90
      });
      
      imageUrlCloudinary = imageUpload.secure_url;

      fs.rm(file.path, ()=> console.log(`rm(${file.path})`))
    }


    const data = await doQuery(`UPDATE categories SET category_name = ?, category_description = ?, category_image = ?  WHERE id = ?`, [category_name, category_description, imageUrlCloudinary || image, Number(id)])
     

    res.send(data).status(200)


  } catch (err: any) {
    httpError(res, err, 202);
  }
};

export const deleteCategory = async (req:Request, res:Response) => {

  try {


    const {id} = req.params

    const data = await doQuery(`DELETE FROM categories WHERE id = ? `, [Number(id)])

    res.send(data)
    
  } catch (err) {
    console.log(err);
    httpError(res, err as string)
    
    
  }

}




export const getCategories = async (req: Request, res: Response) => {
  try {

    const {local_id} = (req as any).user

    const data = await doQuery(`SELECT * FROM categories WHERE local_id = ? `, [local_id])
  
    res.send(data).status(200)

  } catch (err: any) {
    httpError(res, err, 202);
  }
};




export const stateCategory = async (req:Request, res:Response)=>{

  try {
    
    const user = (req as any).user
    const {category_id, state} = (req.body as {category_id:number, state:number})

    const data = await doQuery(`UPDATE categories SET active = ? WHERE id = ?`, [state, category_id])

    res.json(data).status(200)


  } catch (err: any) {
    httpError(res, err); 
  }

}
export const putSortOrder = async (req:Request, res:Response)=>{

  try {

    const categories:any[] = req.body.categories 

    const idsToUpdate = categories.map((categoria) => categoria.id).join(',');

    let query = `UPDATE categories 
             SET sort_order = CASE id 
             ${categories.map((categoria) => `WHEN ${categoria.id} THEN ${categoria.sort_order}`).join(' ')}
             END
             WHERE id IN (${idsToUpdate})`;
             
    const data = await doQuery(query, [])

    res.send(data)
    
  } catch (err: any) {
    httpError(res, err);
  }

}





export const postOptions = async (req: Request, res: Response) => {
  try {
    
    const {local_id} = (req as any).user
    const {options} = req.body
    

    if (!options) {
      httpError(res, 'No proporciono opciones')
      return
    }


    const data = await doQuery(
      `UPDATE locals SET 
      options_group = ?
  
      WHERE id = ?;`,
      [JSON.stringify(options), local_id]
    );

    res.json(data)


  } catch (err: any) {
    httpError(res, err, 202);
  }
};


export const putOptions = async (req: Request, res: Response) => {
  try {
    const user = ((req as any).user as Admin)
    const {products, group, variations} = req.body //PRODUCTS IDS

    const updateLocalOptions = await doQuery(`UPDATE locals SET options_group = ? WHERE id = ?`, [JSON.stringify(variations), user.local_id ])

    if (!products.length) {
      res.send(updateLocalOptions)
      return 
    }

    const productsRecovery:Product[] | any[] = await doQuery(`SELECT * FROM ?? WHERE id IN (?)`, [user.admin_table, products.join(',')])


    const updatedProducts = productsRecovery.map((product: any) => {
      product.variations = JSON.parse(product.variations);
      const index = product.variations.findIndex((variation: any) => variation.nameVariation === group.nameVariation);
      product.variations[index] = group;
      return product;
    });
    
    // Construir la consulta SQL con múltiples valores
    const updateQuery = `
      UPDATE ??
      SET variations = CASE 
        ${updatedProducts.map((product: any) => `WHEN id = ${product.id} THEN '${JSON.stringify(product.variations)}'`).join(' ')}
        ELSE variations
      END
      WHERE id IN (${products.join(',')})
    `;

    const data = await doQuery(updateQuery, [user.admin_table]);
    

    res.send(data).status(200)

  } catch (err: any) {
    httpError(res, err, 202);
  }
};


export const deleteOptionGroup = async (req: Request, res: Response) => {
  try {

    
    const {local_id} = (req as any).user
    const {id:idGroup} = req.params

    
    let dataSet:any[] = await doQuery(`SELECT options_group FROM locals WHERE id = ?`, [local_id])
    dataSet = JSON.parse(dataSet[0].options_group)
    dataSet = dataSet.filter((e:Variation)=> e.id !== Number(idGroup))
    
    
    const data = await doQuery(`UPDATE locals SET options_group = ? WHERE id = ?` , [JSON.stringify(dataSet), local_id])

    res.send(data).status(200)


  } catch (err: any) {
    console.log(err);
    
    httpError(res, err, 202);
  }
};



///********* */

export const postAdmin = async (req: Request, res: Response) => {

  try {
      const newAdmin = req.body as NewAdmin
      const salt = await genSalt(15)
      newAdmin.password = await hash(newAdmin.password, salt)
      const insertAdmin = await AdminModel.postAdmin(newAdmin)

      res.status(201).json(insertAdmin)
  } catch (err) {
      console.log(err);
      httpError(res, 'ERROR_REGISTER_ADMIN', 403)

  }

}

export const deleteAccount = async (req: Request, res: Response) => {

  try {

    const { user }:{user:Admin} = (req as any)
    
    const cancelSubscription = await SubscriptionModel.cancel(user.sub_id)
    if (!cancelSubscription.id) {
      httpError(res, 'A ocurrido un error', 401)
      return
    }
    const deleteUser = await UserModel.deleteUser(user.id)
    const deleteLocal = await LocalModel.deleteLocal(user.local_id)
    const deleteTableProducts = await LocalModel.deleteTableProducts(user.admin_table)

    res.json({exit:true})
  } catch (err:any) {
      console.log(err);
      httpError(res, err, 403)
  }

}
  