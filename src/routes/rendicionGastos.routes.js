import { Router } from 'express';
import {
  rendGastosAdd,
  rendGastosAll,
  rendGastosBlockDelete,
  rendGastosDelete,
  rendGastosOne,
  rendGastosUpdate,
} from '../controllers/rendicionGastos.controller.js';

const router = Router();

router.get('/rendGastos', rendGastosAll);
router.get('/rendGastos/:id', rendGastosOne);
router.post('/rendGastos', rendGastosAdd);
router.put('/rendGastos/:id', rendGastosUpdate);
router.delete('/rendGastos/:id', rendGastosDelete);
router.delete('/rendGastosBloque', rendGastosBlockDelete);

export default router;
