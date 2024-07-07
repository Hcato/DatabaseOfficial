import { Router } from 'express';
import { createOrder, updateOrder, deleteOrder, getOrders, getOrderById } from '../controller/OrderController';
import { authMiddleware } from '../../shared/middlewares/auth';

const orderRoutes: Router = Router();

orderRoutes.get('/', authMiddleware, getOrders);
orderRoutes.get('/:order_id', authMiddleware,getOrderById);
orderRoutes.post('/', authMiddleware, createOrder);
orderRoutes.put('/:order_id', authMiddleware, updateOrder);
orderRoutes.delete('/:order_id',authMiddleware, deleteOrder);

export default orderRoutes;