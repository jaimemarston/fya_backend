import { Router } from 'express';
import {
  regProyectoAdd,
  regProyectoAddAll,
  regProyectoAll,
  regProyectoBlockDelete,
  regProyectoDelete,
  regProyectoOne,
  regProyectoUpdate,
} from '../controllers/registroProyecto.controller.js';

const router = Router();

router.get('/regProyecto', regProyectoAll);
router.get('/regProyecto/:id', regProyectoOne);
router.post('/regProyecto', regProyectoAdd);
router.post('/regProyectoAddAll', regProyectoAddAll);
router.put('/regProyecto/:id', regProyectoUpdate);
router.delete('/regProyecto/:id', regProyectoDelete);
router.delete('/regProyectoBloque', regProyectoBlockDelete);

export default router;
