import express  from "express";
import product from './product.routes.js';
const router = express.Router();


router.get('/healthcheck',(_,res) => res.sendStatus(200));

router.use(product);

export default router;
