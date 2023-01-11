
import express from 'express';
import { productDomain } from '../domain/product-domain';

const router = express.Router();

//ADMIN Middleware check pending

// product create
router.post('/api/product/create',productDomain.createproduct);

// product update
router.put('/api/product/update/:id',productDomain.updateproduct)
 
// delete product
router.delete('/api/product/delete/:id',productDomain.deleteproduct);

// get all product
router.get('/api/product/get',productDomain.getproduct);
router.get('/api/product/get/:id',productDomain.getproductId);



export { router as productRouter };
