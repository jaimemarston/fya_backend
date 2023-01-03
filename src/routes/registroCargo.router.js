import { Router } from 'express';
import {
  cargoAdd,
  cargoAddAll,
  cargoAll,
  cargoBlockDelete,
  cargoDelete,
  cargoOne,
  cargoUpdate,
} from '../controllers/registroCargo.controller.js';

const router = Router();

router.get('/registroCargo', cargoAll);
router.get('/registroCargo/:id', cargoOne);
router.post('/registroCargo', cargoAdd);
router.post('/registroCargoAddAll', cargoAddAll);
router.put('/registroCargo/:id', cargoUpdate);
router.delete('/registroCargo/:id', cargoDelete);
router.delete('/registroCargoBloque', cargoBlockDelete);

export default router;
