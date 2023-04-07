import { Router } from 'express';

import {
  userAdd,
  userAll,
  userDelete,
  userOne,
  userUpdate,
} from '../controllers/user.controllers.js';
 import { validarJWT, haveRol } from '../middleware/index.js';

const router = Router();

router.get('/usuario', validarJWT, haveRol('ADMIN_ROLE'), userAll);

router.get('/usuario/:id', validarJWT,  haveRol('ADMIN_ROLE', 'USER_ROLE'), userOne);

router.post('/usuario',  userAdd);

router.patch('/usuario/:id', validarJWT,  haveRol('ADMIN_ROLE', 'USER_ROLE'), userUpdate);

router.delete(
  '/usuario/:id',
  // [validarJWT, haveRol('administrador')],
  userDelete
);

export default router;
