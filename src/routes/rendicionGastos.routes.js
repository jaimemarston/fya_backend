import { Router } from 'express';
import {
  rendGastosAdd,
  rendGastosAll,
  rendGastosBlockDelete,
  rendGastosDelete,
  rendGastosOne,
  rendGastosUpdate,
} from '../controllers/rendicionGastos.controller.js';
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();

router.get('/rendGastos', validarJWT, haveRol('ADMIN_ROLE'), rendGastosAll);
router.get('/rendGastos/:id', validarJWT, haveRol('ADMIN_ROLE'), rendGastosOne);
router.post('/rendGastos', validarJWT, haveRol('ADMIN_ROLE'), rendGastosAdd);
router.put('/rendGastos/:id', validarJWT, haveRol('ADMIN_ROLE'), rendGastosUpdate);
router.delete('/rendGastos/:id', validarJWT, haveRol('ADMIN_ROLE'), rendGastosDelete);
router.delete('/rendGastosBloque', validarJWT, haveRol('ADMIN_ROLE'), rendGastosBlockDelete);

export default router;
