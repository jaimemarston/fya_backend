import { Router } from 'express';
import {
  referenciaAll,
  referenciaAddAll,
  referenciaAdd,referenciaDelete
} from '../controllers/registroReferenciaCargo.controller.js';
import { validarJWT } from '../middleware/validar-jwt.js';
import { haveRol } from '../middleware/validar-roles.js';
import multer from "multer";
const upload = multer({ dest: 'public/uploads/' });
const router = Router();

router.get('/registroReferenciaAll', referenciaAll);
router.post('/registroReferenciaAddAll', validarJWT, haveRol('ADMIN_ROLE'), upload.single('file'), referenciaAddAll);

router.post('/registroReferencia',validarJWT, haveRol('ADMIN_ROLE'), referenciaAdd)

router.delete('/registroReferencia/:id',validarJWT, haveRol('ADMIN_ROLE'), referenciaDelete)


export default router;
