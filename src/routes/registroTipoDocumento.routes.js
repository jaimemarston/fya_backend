import { Router } from 'express';
import multer from "multer";
import { validarJWT, haveRol } from '../middleware/index.js';
import {addTipoDoc,getAllTipoDoc, deleteTipoDoc, getOneTipoDoc, getOneTipoDocName} from '../controllers/registroTipoDocumento.controllers.js'
const upload = multer({ dest: 'public/uploads/' });

const router = Router();

router.post('/registro-tipo-documento',  upload.single('file'), addTipoDoc );

router.get('/tipo-documento',  validarJWT, haveRol('ADMIN_ROLE'), getAllTipoDoc );


router.get('/tipo-documento/:id',  validarJWT, haveRol('ADMIN_ROLE'), getOneTipoDoc );


router.get('/tipo-documento/tipo/:tipo',  validarJWT, haveRol('ADMIN_ROLE'), getOneTipoDocName );

router.delete('/delete-tipo-documento/:id',  validarJWT, haveRol('ADMIN_ROLE'), deleteTipoDoc );

export default router;
