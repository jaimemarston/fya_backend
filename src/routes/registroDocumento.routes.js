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

router.get('/regdoc', lugarAll);
router.get('/regdoc/:id', lugarOne);
router.post('/regdoc', lugarAdd);
router.post('/regdocAddAll', lugarAddAll);
router.put('/regdoc/:id', lugarUpdate);
router.delete('/regdoc/:id', lugarDelete);
router.delete('/regdocBloque', lugarBlockDelete);

export default router;
