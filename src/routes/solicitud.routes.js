import { Router } from 'express';
import {
  solicitudAdd,
  solicitudAll,
  solicitudDelete,
  solicitudOne,
  solicitudUpdate,
} from '../controllers/solicitud.controllers.js';

const router = Router();

router.get('/solicitud', solicitudAll);

router.get('/solicitud/:id', solicitudOne);

router.post('/solicitud', solicitudAdd);

router.patch('/solicitud/:id', solicitudUpdate);

router.delete('/solicitud/:id', solicitudDelete);

export default router;
