import { Router } from 'express';
import { loginUser, createUser, updateUser, getUserById, deleteUser, getUsers } from '../controllers/UserController';
import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', authMiddleware, getUsers);
userRoutes.get('/:employee_id', authMiddleware,getUserById);
userRoutes.post('/', authMiddleware, createUser);
userRoutes.put('/:employee_id', authMiddleware, updateUser);
userRoutes.delete('/:employee_id',authMiddleware, deleteUser);

export default userRoutes;