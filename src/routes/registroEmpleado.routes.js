import { Router } from 'express';
import multer from "multer";
import { validarJWT, haveRol } from '../middleware/index.js';
const upload = multer({ dest: 'public/uploads/' });
import { addEmpleado, getEmpleado, deleteEmpleado } from "../controllers/registroEmpleadocontroller.js";
const router = Router();



router.post('/regEmpleado', upload.single('file'), addEmpleado);
router.get('/empleados', validarJWT, haveRol('ADMIN_ROLE'), getEmpleado);
router.delete('/empleado/:id', validarJWT, haveRol('ADMIN_ROLE'), deleteEmpleado  );





export default router;
