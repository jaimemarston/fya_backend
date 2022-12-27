import { Router } from 'express';
import {
  comisionAdd,
  comisionAddAll,
  comisionAll,
  comisionBlockDelete,
  comisionDelete,
  comisionOne,
  comisionUpdate,
} from '../controllers/lugarComision.controller.js';

const router = Router();

router.get('/comision', comisionAll);
router.get('/comision/:id', comisionOne);
router.post('/comision', comisionAdd);
router.post('/comisionAddAll', comisionAddAll);
router.patch('/comision/:id', comisionUpdate);
router.delete('/comision/:id', comisionDelete);
router.delete('/comisionBloque', comisionBlockDelete);

export default router;
