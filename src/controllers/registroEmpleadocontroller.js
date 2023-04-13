import { request, response } from 'express';
import {  registroEmpleado } from '../models/index.js';
import empleadoService from '../services/empleado.service.js';
const addEmpleado = async (req = request, res = response) => {
  try {

    console.log(req.file.path)
    const response = await empleadoService.importEmpleados(req.file.path);
    res
    .status(201)
    .json({ message: 'Se ha creado con éxito', response });
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};


const getEmpleado = async (req = request, res = response) => {
  try {

    const registroEmpleados = await registroEmpleado.findAll()
    res
    .status(201)
    .json({ message: 'Se han encontrado empleados con éxito', registroEmpleados });
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};

const deleteEmpleado = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const registroEmpleados = await registroEmpleado.destroy({where:{id}})
    res
    .status(201)
    .json({ message: 'Se ha eliminado el  empleado con éxito', registroEmpleados });
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }

};



export {
  addEmpleado,
  getEmpleado,
  deleteEmpleado
};
