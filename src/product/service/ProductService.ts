import { ProductRepository } from "../repositories/ProductRepo";
import { Product } from "../models/productmodel";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

export class ProductService {

    public static async getAllProduct(): Promise<Product[]> {
        try{
            return await ProductRepository.findAllProduct();
        }catch (error: any){
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    public static async getProductById(productId: number): Promise<Product | null> {
        try{
            return await ProductRepository.findByProductId(productId);
        }catch (error: any){
            throw new Error(`Error al encontrar el producto: ${error.message}`);
        }
    }

    public static async getProductByName(name: string): Promise<Product | null> {
        try{
            return await ProductRepository.findByProductName(name);
        }catch (error: any){
            throw new Error(`Error al encontrar el producto: ${error.message}`);
        }
    }

    public static async addProduct(product: Product) {
        try {
            product.created_at = DateUtils.formatDate(new Date());
            product.update_at = DateUtils.formatDate(new Date());
            return await ProductRepository.createProduct(product);
        } catch (error: any) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    public static async modifyProduct(productId: number, productData: Product){
        try{
            const productFinded =  await ProductRepository.findByProductId(productId);

            if(productFinded){
                if (productData.category_id_fk) {
                    productFinded.category_id_fk = productData.category_id_fk;
                }
                if (productData.color_id_fk) {
                    productFinded.color_id_fk = productData.color_id_fk;
                }
                if (productData.size_id_fk) {
                    productFinded.size_id_fk = productData.size_id_fk;
                }
                if(productData.name){
                    productFinded.name = productData.name;
                }
                if(productData.description){
                    productFinded.description= productData.description;
                }
                if(productData.price){
                    productFinded.price = productData.price;
                }
                if (productData.total_amount) {
                    productFinded.total_amount = productData.total_amount;
                }
            }else{
                return null;
            }
            productFinded.update_by = productData.update_by
            productFinded.update_at = DateUtils.formatDate(new Date());
            return await ProductRepository.updateProduct(productId, productFinded);
        }catch (error: any){
            throw new Error(`Error al modificar el producto: ${error.message}`);
        }
    }

    public static async deleteProduct(productId: number): Promise<boolean> {
        try{
            return await ProductRepository.deleteProduct(productId);
        }catch (error: any){
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }

}