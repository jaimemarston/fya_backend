import { Router } from 'express';
import {
  regActividadAdd,
  regActividadAll,
  regActividadBlockDelete,
  regActividadDelete,
  regActividadOne,
  regActividadUpdate,
} from '../controllers/registroActividad.controller.js';

const router = Router();

router.get('/regActividad', regActividadAll);
router.get('/regActividad/:id', regActividadOne);
router.post('/regActividad', regActividadAdd);
router.put('/regActividad/:id', regActividadUpdate);
router.delete('/regActividad/:id', regActividadDelete);
router.delete('/regActividadBloque', regActividadBlockDelete);

export default router;
