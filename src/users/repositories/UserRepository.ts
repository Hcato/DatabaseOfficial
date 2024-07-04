import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';

export class UserRepository {

  public static async findAllUser(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT user_id, rol_id, name, email, age, gender FROM users', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }

  public static async findByUserId(user_id: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE user_id = ?', [user_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByUserName(Name: string): Promise<User| null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE name = ?', [Name], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO users (name, password, email, age, gender, created_at, created_by, update_at, update_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    console.log(user);
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.name, user.password, user.email, user.age, user.gender, user.created_at, user.created_by, user.update_at, user.update_by, user.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, user_id: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async updateUser(user_id: number, userData: User): Promise<User | null> {
    const query = 'UPDATE users SET name = ?, rol_id = ?, password = ?, update_at = ?, update_by = ?, deleted = ? WHERE employee_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userData.name, userData.rol_id, userData.password, userData.update_at, userData.update_by, userData.deleted, user_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedEmployee: User = { ...userData, user_id: user_id };
            resolve(updatedEmployee);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(user_id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [user_id], (error, result: ResultSetHeader) => {
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