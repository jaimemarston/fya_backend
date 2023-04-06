import { Router } from 'express';
import multer from "multer";
const upload = multer({ dest: 'public/uploads/' });
import {
  regProyectoAdd,
  regProyectoAddAll,
  regProyectoAll,
  regProyectoBlockDelete,
  regProyectoDelete,
  regProyectoOne,
  regProyectoUpdate,
} from '../controllers/registroProyecto.controller.js';
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();

router.get('/regProyecto',validarJWT, haveRol('ADMIN_ROLE'), regProyectoAll);
router.get('/regProyecto/:id', validarJWT, haveRol('ADMIN_ROLE'), regProyectoOne);
router.post('/regProyecto', validarJWT, haveRol('ADMIN_ROLE'), regProyectoAdd);
router.post('/regProyectoAddAll', validarJWT, haveRol('ADMIN_ROLE'), regProyectoAddAll);
router.post('/regProyectoAddAll', upload.single('file'), regProyectoAddAll);
router.put('/regProyecto/:id', validarJWT, haveRol('ADMIN_ROLE'), regProyectoUpdate);
router.delete('/regProyecto/:id', validarJWT, haveRol('ADMIN_ROLE'), regProyectoDelete);
router.delete('/regProyectoBloque', validarJWT, haveRol('ADMIN_ROLE'), regProyectoBlockDelete);

export default router;
