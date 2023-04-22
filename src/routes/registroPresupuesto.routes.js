import { Router } from 'express';
import multer from "multer";
import {
  registroPresupuestoAdd,
  registroPresupuestoAddAll,
  registroPresupuestoAll,
  registroPresupuestoBlockDelete,
  registroPresupuestoDelete,
  registroPresupuestoOne,
  registroPresupuestoUpdate,
} from '../controllers/registroPresupuesto.js';
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();
const upload = multer({ dest: 'public/uploads/' });

router.get('/registroPresupuesto',validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoAll);
router.get('/registroPresupuesto/:id', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoOne);
router.post('/registroPresupuesto', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoAdd);
router.post('/registroPresupuestoAddAll', upload.single('file'), registroPresupuestoAddAll);
router.put('/registroPresupuesto/:id', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoUpdate);
router.delete('/registroPresupuesto/:id', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoDelete);
router.delete('/registroPresupuestoBloque', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoBlockDelete);

export default router;
