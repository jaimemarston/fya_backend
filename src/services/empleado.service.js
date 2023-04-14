import xlsx from "xlsx";
import fs from "fs";
import { registroEmpleado } from "../models/index.js";

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
    return registro
  });



  
  // Guardar los datos en la tabla
  const result = await registroEmpleado.bulkCreate(data, {
    ignoreDuplicates: true
  }); 

  fs.unlinkSync(filePath);
  return result;
}
  
export default {
  importEmpleados
}