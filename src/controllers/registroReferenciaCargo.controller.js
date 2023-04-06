import { request, response } from 'express';
import {  RegistroCodigoReferencia } from '../models/index.js';
import { HttpStatus } from '../utils/status.utils.js';


const referenciaAll = async (req = request, res = response) => {
  try {
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.pageSize || 10;
    const offset = (page - 1) * pageSize;

    const { rows: codigoReferencias, count } = await RegistroCodigoReferencia.findAndCountAll({
      where: { estado: true },
      limit: pageSize,
      offset,
      order: [['id', 'ASC']]
    });

    res
      .status(200)
      .json({ message: 'Lista de codigos de referencia', codigoReferencias:codigoReferencias || [], count });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

/* 
const referenciaAddAll = async (req = request, res = response) => {
  try {
    const response = await codeReferenceService.importCodeReferences(req.file.path);
    return res.status(HttpStatus.CREATED).json({
      response
    });
  } catch (error) {
    console.error("ERROR IN referenciaAddAll", error);
    fs.unlinkSync(req.file.path);

    return res.status(HttpStatus.BAD_REQUEST).json({
      error
    });
  }
};
 */


export {
  referenciaAll,
 /*  referenciaAddAll */
};
