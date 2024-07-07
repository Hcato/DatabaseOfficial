import { Request, Response } from 'express';
import { orderService } from '../service/OrderService';

export const getOrders= async (_req: Request, res: Response) => {
  try {
    const users = await orderService.getAllOrder();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const user = await orderService.getOrderById(parseInt(req.params.order_id, 10));
    if(user){
      res.status(201).json(user);
    }else{
      res.status(404).json({ message: 'No se encontró la orden' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newUser = await orderService.addOrder(req.body);
    if(newUser){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedUser = await orderService.modifyOrder(parseInt(req.params.order_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await orderService.deleteOrder(parseInt(req.params.order_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó la orden' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};