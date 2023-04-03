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

router.get('/usuario', validarJWT, userAll);

router.get('/usuario/:id', userOne);

router.post('/usuario', userAdd);

router.patch('/usuario/:id', userUpdate);

router.delete(
  '/usuario/:id',
  // [validarJWT, haveRol('administrador')],
  userDelete
);

export default router;
