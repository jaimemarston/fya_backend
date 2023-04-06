import { Router } from 'express';
import {
  solicitudProductoAdd,
  solicitudProductoAll,
  solicitudProductoDelete,
} from '../controllers/solicitudProducto.controllers.js';
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();

router.get('/solicitudProducto', validarJWT, haveRol('ADMIN_ROLE'),  solicitudProductoAll);

router.post('/solicitudProducto', validarJWT, haveRol('ADMIN_ROLE'),  solicitudProductoAdd);

router.delete('/solicitudProducto/:id', validarJWT, haveRol('ADMIN_ROLE'),  solicitudProductoDelete);

export default router;
