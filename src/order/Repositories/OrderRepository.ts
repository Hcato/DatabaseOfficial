import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order } from '../models/Ordermodel';

export class OrderRepository {

  public static async findAllOrder(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT order_id, user_id_fk, total, status FROM `order`', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Order[] = results as Order[];
          resolve(users);
        }
      });
    });
  }

  public static async findByOrderId(order_id: number): Promise<Order | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `order` WHERE order_id = ?', [order_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: Order[] = results as Order[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createOrder(order: Order): Promise<Order> {
    const query = 'INSERT INTO `order` (user_id_fk, status, total, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(order);
    return new Promise((resolve, reject) => {
      connection.execute(query, [order.user_id, order.status, order.total, order.created_at, order.created_by, order.update_at, order.update_by, order.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdorderId = result.insertId;
          const createdOrder: Order = { ...order, order_id: createdorderId };
          resolve(createdOrder);
        }
      });
    });
  }

  public static async updateOrder(order_id: number, orderData: Order): Promise<Order | null> {
    const query = 'UPDATE `order` SET user_id_fk = ?, status= ?, user_id = ?, total = ?, update_at = ?, update_by = ?, deleted = ? WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderData.user_id, orderData.status, orderData.user_id, orderData.total, orderData.update_at, orderData.update_by, orderData.deleted, order_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrder: Order = { ...orderData, order_id: order_id };
            resolve(updatedOrder);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteOrder(order_id: number): Promise<boolean> {
    const query = 'DELETE FROM `order` WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order_id], (error, result: ResultSetHeader) => {
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