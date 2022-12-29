import { Router } from 'express';
import {
  lugarAdd,
  lugarAddAll,
  lugarAll,
  lugarBlockDelete,
  lugarDelete,
  lugarOne,
  lugarUpdate,
} from '../controllers/registroDocumento.controller.js';

const router = Router();

router.get('/lugar', lugarAll);
router.get('/lugar/:id', lugarOne);
router.post('/lugar', lugarAdd);
router.post('/lugarAddAll', lugarAddAll);
router.put('/lugar/:id', lugarUpdate);
router.delete('/lugar/:id', lugarDelete);
router.delete('/lugarBloque', lugarBlockDelete);

export default router;
