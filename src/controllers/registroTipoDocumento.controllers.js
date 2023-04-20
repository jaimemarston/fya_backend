import { request, response } from 'express';
import {  RegistroTipoDocumento } from '../models/index.js';
import  importTipoDocService from "../services/tipoDocumento.service.js";
const addTipoDoc = async (req = request, res = response) => {
  try {

    console.log(req.file.path)
   const result = await  importTipoDocService.importTipoDoc(req.file.path);

    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', result });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};

const getAllTipoDoc = async (req = request, res = response) => {
  try {
    const page = req?.query?.page || 1;
    const pageSize = req?.query?.pageSize || 10;
    const offset = (page - 1) * pageSize;
    const { rows: registroTipoDocumento, count } = await RegistroTipoDocumento.findAndCountAll({
      limit: pageSize,
      offset,
      order: [['id', 'ASC']]
    });

    res
      .status(200)
      .json({ message: 'Lista de tipos de documentos', registroTipoDocumento: registroTipoDocumento || [], count });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};


const deleteTipoDoc = async (req = request, res = response) => {
  try {

    const id = req.params.id
   const deleteTipoDoc = await  RegistroTipoDocumento.destroy({where: {id}})

   const result = await  RegistroTipoDocumento.findAll()

    res
    .status(201)
    .json({ message: 'Se ha eliminado con éxito', result });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};





export { addTipoDoc, getAllTipoDoc, deleteTipoDoc };
