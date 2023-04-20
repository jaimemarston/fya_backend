import { Router } from 'express';
import {
  rendGastosProductsAll,
  rendGastosProductsOne,
  rendGastosProductsAdd,
  rendGastosProductsUpdate,
  rendGastosProductsDelete,
  rendGastosProductsBlockDelete,
  rendGastosProductsByRendicion
} from '../controllers/rendicionGastosProductos.controller.js';
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();

router.get('/rendGastosProducts', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsAll);
router.get('/rendGastosProducts/:id', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsOne);
router.get('/rendGastosProduct/:rendicion', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsByRendicion);
router.post('/rendGastosProducts', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsAdd);
router.put('/rendGastosProducts/:id', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsUpdate);
router.delete('/rendGastosProducts/:id', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsDelete);
router.delete('/rendGastosBloqueProducts', validarJWT, haveRol('ADMIN_ROLE'),  rendGastosProductsBlockDelete);

export default router;
