import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Product } from '../models/productmodel';

export class ProductRepository {

  public static async findAllProduct(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT product_id, category_id, name, description, price, stock FROM product', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Product[] = results as Product[];
          resolve(users);
        }
      });
    });
  }

  public static async findByProductId(product_id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE product_id = ?', [product_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Product[] = results as Product[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByProductName(Name: string): Promise<Product| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM product WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Product[] = results as Product[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createProduct(product: Product): Promise<Product> {
    const query = 'INSERT INTO product (name, description, price, stock, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(product);
    return new Promise((resolve, reject) => {
      connection.execute(query, [product.name, product.description, product.price, product.stock, product.created_at, product.created_by, product.update_at, product.update_by, product.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdProductId = result.insertId;
          const createProduct: Product = { ...product, product_id: createdProductId };
          resolve(createProduct);
        }
      });
    });
  }

  public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
    const query = 'UPDATE product SET name = ?, description = ?, price = ?, stock= ? , update_at = ?, update_by = ?, deleted = ? WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [productData.name, productData.description, productData.price, productData.stock, productData.update_at ,productData.update_by, productData.deleted, product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: Product = { ...productData, product_id: product_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteProduct(product_id: number): Promise<boolean> {
    const query = 'DELETE FROM product WHERE product_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }

}