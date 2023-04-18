import { Router } from 'express';
import multer from "multer";
import {
  registroPresupuestoFinancieroAdd,
  registroPresupuestoFinancieroAddAll,
  registroPresupuestoFinancieroAll,
  registroPresupuestoFinancieroBlockDelete,
  registroPresupuestoFinancieroDelete,
  registroPresupuestoFinancieroOne,
  registroPresupuestoFinancieroUpdate,
} from '../controllers/registroPresupuestoFinanciero.js';
import { validarJWT, haveRol } from '../middleware/index.js';
const router = Router();
const upload = multer({ dest: 'public/uploads/' });

router.get('/registroPresupuestoFinanciero',validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoFinancieroAll);
router.get('/registroPresupuestoFinanciero/:id', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoFinancieroOne);
router.post('/registroPresupuestoFinanciero', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoFinancieroAdd);
router.post('/registroPresupuestoFinancieroAddAll', upload.single('file'), registroPresupuestoFinancieroAddAll);
router.put('/registroPresupuestoFinanciero/:id', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoFinancieroUpdate);
router.delete('/registroPresupuestoFinanciero/:id', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoFinancieroDelete);
router.delete('/registroPresupuestoFinancieroBloque', validarJWT, haveRol('ADMIN_ROLE'), registroPresupuestoFinancieroBlockDelete);

export default router;
