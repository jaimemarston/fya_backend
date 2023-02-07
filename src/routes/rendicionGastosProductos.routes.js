import { Router } from 'express';
import {
  rendGastosProductsAll,
  rendGastosProductsOne,
  rendGastosProductsAdd,
  rendGastosProductsUpdate,
  rendGastosProductsDelete,
  rendGastosProductsBlockDelete,
} from '../controllers/rendicionGastosProductos.controller.js';

const router = Router();

router.get('/rendGastosProducts', rendGastosProductsAll);
router.get('/rendGastosProducts/:id', rendGastosProductsOne);
router.post('/rendGastosProducts', rendGastosProductsAdd);
router.put('/rendGastosProducts/:id', rendGastosProductsUpdate);
router.delete('/rendGastosProducts/:id', rendGastosProductsDelete);
router.delete('/rendGastosBloqueProducts', rendGastosProductsBlockDelete);

export default router;
