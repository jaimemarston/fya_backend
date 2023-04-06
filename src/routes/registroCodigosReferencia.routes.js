import { Router } from 'express';
import {
  referenciaAll,
  referenciaAddAll
} from '../controllers/registroReferenciaCargo.controller.js';

const router = Router();

router.get('/registroReferenciaAll', referenciaAll);
router.post('/registroReferenciaAddAll', referenciaAddAll);


export default router;
