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
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();

router.get('/regdoc', validarJWT, haveRol('ADMIN_ROLE'), lugarAll);
router.get('/regdoc/:id', validarJWT, haveRol('ADMIN_ROLE', 'USER_ROLE'), lugarOne);
router.post('/regdoc', validarJWT, haveRol('ADMIN_ROLE', 'USER_ROLE'), lugarAdd);
router.post('/regdocAddAll', validarJWT, haveRol('ADMIN_ROLE', 'USER_ROLE'), lugarAddAll);
router.put('/regdoc/:id', validarJWT, haveRol('ADMIN_ROLE', 'USER_ROLE'), lugarUpdate);
router.delete('/regdoc/:id', validarJWT, haveRol('ADMIN_ROLE', 'USER_ROLE'), lugarDelete);
router.delete('/regdocBloque', validarJWT, haveRol('ADMIN_ROLE', 'USER_ROLE'), lugarBlockDelete);

export default router;
