import axios from "axios";
import { Request, Response } from "express";
import { Product } from "../models/product.model.js";
import { DeleteRowResponse } from "../responses/product.response.js";
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from "../schema/product.schema.js";
import {
  createProduct,
  deleteProduct,
  findProduct,
  getRetableColumns,
  updateProduct,
} from "../service/product.service.js";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {

  const body = req.body;


  const columns = await getRetableColumns();
  if (!columns) {
    return res.sendStatus(404);
  }

  const products = await createProduct({ ...body }, columns);

  if (!products) {
    return res.send(404).json({ message: "Product did not created" });
  }
  const product: Product = {
    name: null,
    description: null,
    price: null,
    amount: null
  };
  //get last index of array when sorted by created at
  const productData = products.data.rows.sort((a, b) => a.created_at.valueOf() - b.created_at.valueOf()).at(products.data.rows.length - 1);

  //get columns info
  productData?.columns.map((column) => {
    const value = columns.find((col) => col.column_id == column.column_id);
    if (value != undefined && column.cell_value != null) {
      product[value.title as keyof Product] = column.cell_value as any;
    }
  });


  return res.status(201).send(product);


}

export async function updateProductHandler(
  req: Request,
  res: Response
) {

  const productId = parseInt(req.params.productid);
  const update = req.body;

  const columns = await getRetableColumns();
  if (!columns) {
    return res.sendStatus(404);
  }

  const updatedProduct = await updateProduct(productId, update, columns);

  if (!updatedProduct) {
    return res.sendStatus(404);
  }

  if (updatedProduct.statusCode != undefined) {
    return res.status(updatedProduct.statusCode).send(`${updatedProduct.message} ${updatedProduct.error}`);
  }

  return res.send(updatedProduct);
}

export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  const productId = parseInt(req.params.productid);

  const columns = await getRetableColumns();
  if (!columns) {
    return res.sendStatus(404);
  }

  const products = await findProduct();

  if (!products) {
    return res.sendStatus(404);
  }

  if (products.statusCode != undefined) {
    return res.status(products.statusCode).send(`${products.message} ${products.error}`);
  }

  const product: Product = {
    name: null,
    amount: null,
    description: null,
    price: null
  };
  //pairs productId in retable rows
  const productData = products.data.rows.find(row => row.row_id == productId);
  if (!productData) {
    return res.sendStatus(404);
  }
  productData.columns.map((column) => {

    const value = columns.find((col) => col.column_id == column.column_id);
    if (value != undefined && column.cell_value != null) {
      product[value.title as keyof Product] = column.cell_value as any;
    }

  });


  return res.send(product);
}

export async function getAllProductHandler(
  req: Request,
  res: Response
) {
  const columns = await getRetableColumns();
  if (!columns) {
    return res.sendStatus(404);
  }

  const products = await findProduct();

  if (!products) {
    return res.sendStatus(404);
  }

  if (products.statusCode != undefined) {
    return res.status(products.statusCode).send(`${products.message} ${products.error}`);
  }

  //get products column data
  const productsData = products.data.rows.map((row) => {
    return row.columns;
  });

  const productsResponse: Product[] = [];

  productsData?.map((products) => {
    const product: Product = {
      name: null,
      amount: null,
      description: null,
      price: null
    };
    products.map((column) => {
      // find product key, value and create a response model
      const value = columns.find((col) => col.column_id == column.column_id);
      if (value != undefined && column.cell_value != null) {
        product[value.title as keyof Product] = column.cell_value as any;
      }

    });
    productsResponse.push(product);

  })

  return res.send(productsResponse);
}

export async function getColumnsHandler(
  req: Request,
  res: Response
) {

  const columns = await getRetableColumns();

  if (!columns) {
    return res.sendStatus(404);
  }

  return res.send(columns);
}

export async function deleteProductHandler(
  req: Request<{}, {}, DeleteProductInput["body"]>,
  res: Response
) {
  const productIds = req.body.productIds;

  const deletedProduct = await deleteProduct(productIds);

  if (!deletedProduct || deletedProduct.data.deleted_row_count === 0) {
    return res.status(404).send("Row Id does not exist in the Retable");
  }
  if (deletedProduct.statusCode != undefined) {
    return res.status(deletedProduct.statusCode).send(`${deletedProduct.message} ${deletedProduct.error}`);
  }

  return res.sendStatus(200);
}
