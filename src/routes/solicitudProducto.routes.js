import { Router } from 'express';
import {
  solicitudProductoAdd,
  solicitudProductoAll,
  solicitudProductoDelete,
} from '../controllers/solicitudProducto.controllers.js';

const router = Router();

router.get('/solicitudProducto', solicitudProductoAll);

router.post('/solicitudProducto', solicitudProductoAdd);

router.delete('/solicitudProducto/:id', solicitudProductoDelete);

export default router;
