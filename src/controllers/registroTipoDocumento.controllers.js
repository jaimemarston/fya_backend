import { request, response } from 'express';
import {  RegistroTipoDocumento } from '../models/index.js';
import  importTipoDocService from "../services/tipoDocumento.service.js";


const addTipoDoc = async (req = request, res = response) => {
  try {

  
   const result = await  importTipoDocService.importTipoDoc(req.file.path);

    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', result });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};


const addTipoDocOne = async (req = request, res = response) => {
  const {body} = req;

  try {
    
   const result = await  RegistroTipoDocumento.create({...body});



  console.log('boidy', result)
    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', result });
 
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};

const getAllTipoDoc = async (req = request, res = response) => {
  try {

   const registroTipoDocumento = await  RegistroTipoDocumento.findAll()

    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', registroTipoDocumento });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};



const updateAllTipoDoc = async (req = request, res = response) => {
  const {id} = req.params
  const {body} = req;
  try {
    

   const registroTipoDocumento = await  RegistroTipoDocumento.update({...body}, {where: {id}})

    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', registroTipoDocumento });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};


const getOneTipoDoc = async (req = request, res = response) => {

  const {id} = req.params
  try {

   const result = await  RegistroTipoDocumento.findOne({where:{id}})

    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', result });

    
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};

const getOneTipoDocName = async (req = request, res = response) => {

  const {tipo} = req.params
  try {

   const result = await  RegistroTipoDocumento.findOne({where:{nombre: `${tipo}`}})

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





export { addTipoDoc, getAllTipoDoc, deleteTipoDoc, getOneTipoDoc,getOneTipoDocName, addTipoDocOne, updateAllTipoDoc };
