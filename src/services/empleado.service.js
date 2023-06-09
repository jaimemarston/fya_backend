import xlsx from "xlsx";
import fs from "fs";
import { registroEmpleado, Usuario } from "../models/index.js";
import bcryptjs from 'bcryptjs';

const importEmpleados = async (filePath) => {
  

    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Eliminar la primera fila (encabezados de columna)
    rows.shift();
    rows.shift();
    
 

    // Crear un array de objetos para bulkCreate
  const data = rows.map((row) => {
    const registro = {
      codigo: row[0].toString().trim(),
      docIdentidad: row[8].toString().trim(),
      ndocumento: row[8].toString().trim(),
      nombre: row[5].toString().trim(),
      estado: row[66].toString().trim(),
      phone: row[13].toString().trim(),
      cargo: row[15].toString().trim(),
      email: row[14].toString().trim(),
    };
    console.log(registro.estado)
    return registro
  });

/*   console.log(data)

const dataUser = data.map((row) => {
  const user = {
    nombre: row.nombre,
    codigo: row.codigo,
    dni: row.docIdentidad,
    password: bcryptjs.hashSync(row.docIdentidad, salt),
    email: row.email,
    rol: 'USER_ROLE'

  }

  return user;
}) */

/* await Usuario.bulkCreate(dataUser, {
  ignoreDuplicates: true
})
 */
  
  // Guardar los datos en la tabla
  const result = await registroEmpleado.bulkCreate(data, {
    ignoreDuplicates: true
  }); 




  fs.unlinkSync(filePath);
  return {result,data};
}
  
export default {
  importEmpleados
}