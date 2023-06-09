
import { 
   Usuario } from "../models/index.js";
import bcryptjs from 'bcryptjs';

const importUers = async (data) => {
  
  const salt = bcryptjs.genSaltSync();


const dataUser = await  data.map((row) => {
  const user = {
    nombre: row.nombre,
    codigo: row.codigo,
    dni: row.docIdentidad,
    password: bcryptjs.hashSync(row.docIdentidad, salt),
    estado: row.estado,
    email: row.email,
    rol: 'USER_ROLE'

  }

  return user;
})

const result = await Usuario.bulkCreate(dataUser, {
  ignoreDuplicates: true
})

  



  return result;
}
  
export default {
  importUers
}