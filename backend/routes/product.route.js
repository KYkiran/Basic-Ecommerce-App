import express from "express";
import { deleteProducts, getProducts, createProducts, putProducts } from "../controller/product.controller.js";

const router=express.Router();

router.get('/',getProducts);
router.post('/',createProducts);
router.put('/:id',putProducts);
router.delete("/:id",deleteProducts);

export default router