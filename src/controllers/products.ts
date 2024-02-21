import { httpError } from "../utils/httpError";
import { doQuery } from "../mysql/config";
import { Request, Response } from "express";
import { checkData } from "../utils/checkData";
import { Admin } from "../interface/admin";
import { Product } from "../interface/product";



 
export const getProducts = async (req: Request, res: Response) => {
  try {
    const table: string = req.params.table || (req as any).user?.admin_table;

    console.log(table, "NUEVA VISITA");

    if (!table) {
      return httpError(res, "No hay tabla para consultar", 403);
    }

    //INTERFACE Product
    let data: any[] = await doQuery(
      `SELECT ??.id, name, stock, price, ingredients, ??.local_id, image, category_id, category_name, category_image, categories.active as category_active, categories.sort_order as category_sort, variations, description, fixed FROM ?? INNER JOIN categories ON categories.id = ??.category_id AND categories.local_id = ??.local_id`,
      [table, table, table, table, table]
    );

    for (let i = 0; i < data.length; i++) {
      data[i].variations
        ? (data[i].variations = JSON.parse(data[i].variations))
        : null;
      data[i].ingredients
        ? (data[i].ingredients = JSON.parse(data[i].ingredients))
        : null;
    }

    
    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, "ERROR_GET_PRODUCTS", 403);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { local, id } = req.params;
    const { admin_table } = (req as any).user;

    const data: any[] = await doQuery(
      `SELECT ??.id, name, price, ingredients, category_id, category_name FROM ?? INNER JOIN categories ON categories.id = ??.category_id AND categories.local_id = ??.local_id WHERE ??.id = ? `,
      [local, local, local, local, local, Number(id)]
    );

    if (checkData(data))
      return httpError(res, "No se han encontrado productos", 403);

    res.json(data);
  } catch (err: any) {
    res.status(403).json({ error: "asd" });
  }
};

export const postProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as Admin;
    const product = req.body as Product;
    product.local_id = user.local_id;
    console.log(product);

    const data = await doQuery(`INSERT INTO products SET ?`, [
      product,
    ]);
 
    return res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { admin_table } = (req as any).user;
    const data = await doQuery(`DELETE FROM products WHERE id = ?;`, [
      Number(id),
    ]);
    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as Admin;
    const product = req.body as Product;
    const data = await doQuery(`UPDATE products SET ? WHERE id = ? `, [
      product,
      product.id,
    ]);

    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};

export const updateFixedProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as Admin;
    const { id, fixed } = req.body;
    const data = await doQuery(`UPDATE products SET fixed = ? WHERE id = ?`, [
      fixed,
      id,
    ]);
    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};

export const updateStockProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user as Admin;
    const { id: idProduct, stock } = req.body;
    const data = await doQuery(`UPDATE products SET stock = ? WHERE id = ?`, [
      stock,
      idProduct,
    ]);
    res.json(data);
  } catch (err: any) {
    console.log(err);
    httpError(res, err, 403);
  }
};

// export const uploadExcelProducts = async (req: Request, res: Response) => {
//   try {
//     const excel = req.file;
//     const user = (req as any).user as Admin;
//     const workbook = xlsx.readFile(excel!.path);
//     const sheetName = workbook.SheetNames[0];
//     const workSheet = workbook.Sheets[sheetName];
//     const jsonData:Product[] = xlsx.utils.sheet_to_json(workSheet);


//     for (let i = 0; i < jsonData.length; i ++) {
//         await doQuery(`INSERT INTO products SET ?`, [
//           jsonData[i],
//         ]);
//     }

//     res.send("ok");
//   } catch (err: any) {
//     console.log(err);
//     httpError(res, err, 403);
//   }
// };
