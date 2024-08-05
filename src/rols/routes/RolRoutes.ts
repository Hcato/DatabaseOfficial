import { Router } from 'express';
import { getRolById, getRols, createRol, updateRol, deleteRol } from '../controllers/RolController';
import { authMiddleware } from '../../shared/middlewares/auth';

const rolsRoutes: Router = Router();

rolsRoutes.get('/', getRols);
rolsRoutes.get('/:rol_id', authMiddleware,getRolById);
rolsRoutes.post('/',  createRol);
rolsRoutes.put('/:rol_id', updateRol);
rolsRoutes.delete('/:rol_id',authMiddleware, deleteRol);

export default rolsRoutes;