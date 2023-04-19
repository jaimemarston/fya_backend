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

   const result = await  RegistroTipoDocumento.findAll()

    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', result });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
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
