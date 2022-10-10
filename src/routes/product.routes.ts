import express from "express";
import { createProductHandler, deleteProductHandler, getAllProductHandler, getColumnsHandler, getProductHandler, updateProductHandler } from "../controller/product.controller.js";

import validateResource from "../middleware/validateResource.js";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema.js";
import { getRetableColumns } from "../service/product.service.js";

const router = express.Router();

router.get('/v1/api/product/:productid',validateResource(getProductSchema),getProductHandler);
router.get('/v1/api/product',getAllProductHandler);
router.post("/v1/api/product",validateResource(createProductSchema),createProductHandler);
router.put("/v1/api/product/:productid",updateProductHandler);
router.delete("/v1/api/product/delete",validateResource(deleteProductSchema),deleteProductHandler);
router.get("/v1/api/columns",getColumnsHandler);



export default router;