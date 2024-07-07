import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from '../controller/ProductController';
import { authMiddleware } from '../../shared/middlewares/auth';

const ProductRoutes: Router = Router();

ProductRoutes.get('/', authMiddleware, getProducts);
ProductRoutes.get('/:product_id', authMiddleware,getProductById);
ProductRoutes.post('/', authMiddleware, createProduct);
ProductRoutes.put('/:product_id', authMiddleware, updateProduct);
ProductRoutes.delete('/:product_id',authMiddleware, deleteProduct);

export default ProductRoutes;