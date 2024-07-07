import { Request, Response } from 'express';
import { ProductService } from '../service/ProductService';

export const getProducts= async (_req: Request, res: Response) => {
  try {
    const rols = await ProductService.getAllProduct();
    if(rols){
      res.status(201).json(rols);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const rol = await ProductService.getProductById(parseInt(req.params.product_id, 10));
    if(rol){
      res.status(201).json(rol);
    }else{
      res.status(404).json({ message: 'No se encontró el producto' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newRol = await ProductService.addProduct(req.body);
    if(newRol){
      res.status(201).json(newRol);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedRol = await ProductService.modifyProduct(parseInt(req.params.product_id, 10), req.body);
    if(updatedRol){
      res.status(201).json(updatedRol);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductService.deleteProduct(parseInt(req.params.product_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el producto.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};