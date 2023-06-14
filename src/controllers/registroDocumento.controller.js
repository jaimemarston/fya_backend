import { request, response } from 'express';
import { validateRegistroDocumento } from '../helpers/schemaRegistroDocumento.js';
import { RegistroDocumento, Usuario, registroEmpleado } from '../models/index.js';
import fs from "fs";
import multer from "multer";
import {PDFDocument}  from 'pdf-lib';
const carpeta = '../../../public/uploads';
import {  Sequelize } from "sequelize";

import path from "path";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const getBoletasMay = async (req = request, res = response) => {
  try {
    const rowsUsers = await RegistroDocumento.findAll({
      where: Sequelize.literal("TO_DATE(fechaenvio, 'DD-MM-YYYY') >= DATE '2023-04-01' AND TO_DATE(fechaenvio, 'DD-MM-YYYY') < DATE '2023-05-01'"),
    });

      for (const row of rowsUsers) {
      await Document.update(
        { estado: false, fechafirma: null },
        { where: { id: row.id } }
      );
    }

    const carpeta = './public/uploads';
    const prefijo = 'firmado';
    const sufijo = '202304.pdf';

    const getBoletasMayByBoleta = async () => {
      try {
        const rowsUsers = await RegistroDocumento.findAll();
    
        const data = rowsUsers.filter((res) => {
          const boletaName = res.nombredoc.split('_')[2].split('.')[0];
          return boletaName === '202304';
        });
    
        for (const row of data) {
          await RegistroDocumento.update(
            { estado: false, fechafirma: null },
            { where: { id: row.id } }
          );
        }
    
        console.log('Registros actualizados correctamente.', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };


   

    const eliminarDocumentosPorPatron = (carpeta, prefijo, sufijo) => {
      
      fs.readdir(carpeta, (error, archivos) => {
        if (error) {
          console.error('Error al leer la carpeta:', error);
          return;
        }
    
        archivos.forEach((archivo) => {
          if (archivo.startsWith(prefijo) && archivo.endsWith(sufijo)) {
            const rutaArchivo = path.join(carpeta, archivo);
            fs.unlink(rutaArchivo, (error) => {
              if (error) {
                console.error('Error al eliminar el archivo:', archivo, error);
              } else {
                console.log('Archivo eliminado:', archivo);
              }
            });
          }
        });
      });
    };

    const getBoletas2022 = async () => {
      try {
        const rowsUsers = await RegistroDocumento.findAll({
          where: Sequelize.literal("TO_DATE(fechaenvio, 'DD-MM-YYYY') >= DATE '2021-01-01' AND TO_DATE(fechaenvio, 'DD-MM-YYYY') < DATE '2023-01-01'"),
        });
    
        for (const row of rowsUsers) {
          await RegistroDocumento.destroy({ where: { id: row.id } });
        }
    
        console.log('Registros eliminados correctamente.', rowsUsers);
        return rowsUsers
      } catch (error) {
        console.error('Error:', error);
      }
    };


    const eliminarDocumentosPorPatron2022 = (carpeta) => {
      fs.readdir(carpeta, (error, archivos) => {
        if (error) {
          console.error('Error al leer la carpeta:', error);
          return;
        }
    
        archivos.forEach((archivo) => {
          if (
            (archivo.startsWith('Boleta') || archivo.startsWith('firmado_')) &&
            (archivo.includes('2022') || archivo.includes('2021'))
          ) {
            const rutaArchivo = path.join(carpeta, archivo);
            fs.unlink(rutaArchivo, (error) => {
              if (error) {
                console.error('Error al eliminar el archivo:', archivo, error);
              } else {
                console.log('Archivo eliminado:', archivo);
              }
            });
          }
        });
      });
    };


     getBoletasMayByBoleta() 
     eliminarDocumentosPorPatron(carpeta,prefijo, sufijo) 
     getBoletas2022()
     eliminarDocumentosPorPatron2022(carpeta)
 

    res.status(200).json('Exito')
  } catch (error) {
    console.error('Error:', error);
  }
};

const setFirmas = async(req = request, res = response) => {
  const carpeta = './public/uploads/firmas';
  fs.readdir(carpeta, (error, archivos) => {
    if (error) {
      console.error('Error al leer la carpeta:', error);
      return;
    }

    archivos.forEach(async (archivo) => {



      const dni1 = archivo.split('_')[1]
      if(!dni1)return
      const dni = dni1.split('.')[0]
      const firma = archivo.split('.')[0]

      const usuario = await Usuario.findOne({where: {dni: dni}})
      if (!usuario) {
        return ;
      }

      await Usuario.update(
        { imgfirma: firma},
        {
          where: {
            dni: dni
          },
        }
      );

      console.log(dni, firma)
      console.log(usuario)


    });
  });
res.status(200).json('Exito')
}


const upload = multer({ storage: storage });

const lugarOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const registroDocumento = await RegistroDocumento.findOne({
      where: { id, estado: true },
    });
    if (!registroDocumento) {
      return res
        .status(404)
        .json({ message: 'Registro de documento no encontrado' });
    }
    res
      .status(200)
      .json({ message: 'Registro de documento encontrado', registroDocumento });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const lugarAll = async (req = request, res = response) => {
  try {
    const [registroDocumento, count] = await Promise.all([
      RegistroDocumento.findAll({
        order: ['id'],
        where: { estado: true },
      }),
      RegistroDocumento.count({
        where: { estado: true },
      }),
    ]);
    res.status(200).json({
      message: 'Lista de registro de documento',
      registroDocumento,
      count,
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const lugarAdd = async (req = request, res = response) => {
  const { body } = req;
  const { error } = validateRegistroDocumento(req.body);

  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }
  try {
    const existCode = await RegistroDocumento.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    const registroDocumento = await RegistroDocumento.create({ ...body });

    res
      .status(201)
      .json({ message: 'Se ha creado con éxito', registroDocumento });
  } catch (err) {
    res.status(400).json({ message: 'hable con el administrador', err });
  }
};

const lugarAddAll = async (req = request, res = response) => {
  try {

    const files = req.files

  const documentsData = files.map((docData) => {
    const fechaBoleta = docData.originalname.split('_')[2].split('.')[0];
    const year = fechaBoleta.slice(0, 4);
    const month = fechaBoleta.slice(4, 6);
    const day = "01"; 
    const date = new Date(year, parseInt(month) - 1, day);
    let fechaEnvio = date.toLocaleDateString("es-ES").replace(/\//g, '-');
    fechaEnvio = fechaEnvio.split('-').map(part => part.padStart(2, '0')).join('-');


    const doc = {
      tipodoc: docData.originalname.split("_")[0],
      nombredoc:docData.originalname,
      ndocumento: docData.originalname.split("_")[1],
      fechaenvio: fechaEnvio
     
    }
    return doc
  } )


const empleado = await registroEmpleado.findAll();





const documentosValidos = documentsData.filter((documento) =>
empleado.some((empleado) => empleado.docIdentidad === documento.ndocumento)
);



  const regDoc = await RegistroDocumento.bulkCreate(documentosValidos, {
    updateOnDuplicate: [ 'nombredoc', 'tipodoc', 'ndocumento'],
    upsert: true
    
  })

  res
  .status(201)
  .json({ message: 'Se ha subido con éxito', regDoc });
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });

  }
  
/*   let historial = [];
  let existCode;

  try {
    body.forEach(async (element, index) => {
      const { error } = validateRegistroDocumento(element);

      if (error) {
        console.log('error =>', element);

        historial.push(element);
      } else {
        existCode = await RegistroDocumento.findOne({
          where: { codigo: element.codigo },
        });
        if (existCode) {
          console.log('existe=>', element);
          historial.push(element);
        } else {
          console.log('agregar =>', element);
          await RegistroDocumento.create({ ...element });
        }
      }
      if (body.length - 1 === index) {
        const unicos = [...new Set(historial)];
        let respuesta = '';
        if (error) {
          respuesta = 'Hubo un error, revise el documento';
          res.status(400).json({
            error: `${respuesta} `,
            historial: unicos,
          });
        } else if (existCode) {
          respuesta = 'Hay datos repetidos, revise datos del documento';
          res.status(400).json({
            repeat: `${respuesta} `,
            historial: unicos,
          });
        } else {
          let respuesta = 'Se han creado con éxito';
          res.status(201).json({
            message: `${respuesta} `,
            historial: unicos,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'hable con el administrador', err });
  } */
};


const addAllFirm = async (req = request, res = response) => {
  try {

    const files = req.files

    const documentsData = files.map((docData) => {
      if(docData.originalname.split("_")[0] === 'firmado'){
        const fechaBoleta = docData.originalname.split('_')[3].split('.')[0];
        const year = fechaBoleta.slice(0, 4);
        const month = fechaBoleta.slice(4, 6);
        const day = "01"; 
        const date = new Date(year, parseInt(month) - 1, day);
        let fechaEnvio = date.toLocaleDateString("es-ES").replace(/\//g, '-');
        fechaEnvio = fechaEnvio.split('-').map(part => part.padStart(2, '0')).join('-');
        const doc = {
          tipodoc: docData.originalname.split("_")[1],
          nombredoc:docData.originalname.replace('firmado_', ''),
          ndocumento: docData.originalname.split("_")[2],
          fechaenvio: fechaEnvio,
          fechafirma: fechaEnvio,
          estado: true
    
        }
        return doc
      }else {
        const fechaBoleta = docData.originalname.split('_')[2].split('.')[0];
        const year = fechaBoleta.slice(0, 4);
        const month = fechaBoleta.slice(4, 6);
        const day = "01"; 
        const date = new Date(year, parseInt(month) - 1, day);
        let fechaEnvio = date.toLocaleDateString("es-ES").replace(/\//g, '-');
        fechaEnvio = fechaEnvio.split('-').map(part => part.padStart(2, '0')).join('-');
        const doc = {
          tipodoc: docData.originalname.split("_")[0],
          nombredoc:docData.originalname,
          ndocumento: docData.originalname.split("_")[1],
          fechaenvio: fechaEnvio,
          fechafirma: fechaEnvio,
          estado: true
    
        }
        return doc
      }

    } )

  console.log(documentsData)

  const empleado = await registroEmpleado.findAll();



const documentosValidos = documentsData.filter((documento) =>
empleado.some((empleado) => empleado.docIdentidad === documento.ndocumento)
);

const regDoc = await RegistroDocumento.bulkCreate(documentosValidos, {
  updateOnDuplicate: ['nombredoc', 'tipodoc', 'ndocumento', 'fechafirma', 'estado'],
  upsert: true,
  fields: ['nombredoc', 'tipodoc', 'ndocumento', 'fechafirma', 'estado'] // Los campos relevantes
});

  res
  .status(201)
  .json({ message: 'Se ha subido con éxito', regDoc });
    
  } catch (error) {
    res.status(400).json({ message: 'hable con el administrador', error });
  }
  

};


const firmarDoc = async (req,res,next) => {
  const {user,doc} = req.body

try {
  const pdfBytes =   fs.readFileSync(process.cwd() + `/public/uploads/${doc.nombredoc}`);
  const pdfDoc = await PDFDocument.load(pdfBytes);    // Encuentra las coordenadas donde se colocará la imagen de la firma
  const page = pdfDoc.getPages()[0]; // Obtén la primera página del PDF
  const { width, height } = page.getSize(); // Obtén el ancho y alto de la página
/*     const x = width / 2; // Coloca la imagen en el centro de la página
  const y = height / 2; */

  // Agrega la imagen como un sello en la página
  const imageBytes = fs.readFileSync(process.cwd() + `/public/uploads/firmas/${user?.imgfirma}.jpg`);

  const image = await pdfDoc.embedJpg(imageBytes);
  page.drawImage(image, {
/*       x: x - image.width / 2, // Ajusta la posición de la imagen
    y: y - image.height / 2, */
    x: 70,
    y: 60 ,
    width: 45,
    height: 45,
  });

 const newPdf = await  pdfDoc.save()    

 fs.writeFile(process.cwd() + `/public/uploads/firmado_${doc.nombredoc}`, newPdf, function(err) {
  if (err) {
    console.log('Error al guardar el archivo:', err);
  } else {
    console.log('El archivo se ha guardado correctamente');
  }
});

fs.unlink(process.cwd() + `/public/uploads/${doc.nombredoc}`, (err) => {
  if (err) throw err;
  console.log('Archivo borrado exitosamente');
});

const fecha = new Date();
const anio = fecha.getFullYear();
const mes = fecha.getMonth() + 1;
const dia = fecha.getDate();
const fechaPlana = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${anio}`;
const documento = await RegistroDocumento.findOne({where:{id:doc.id}})
 await documento.update({estado:true, fechafirma: fechaPlana})
 res.status(200).send({ message: 'Firmado Correctamente', newdoc: documento});
} catch (error) {
  console.log(error)
}
  


  
 
}

const uploadfile = async (req, res, next) => {
  const file = req.file;
  const dni = req.params.dni;
  console.log(dni)

  const extension = file.path.split('.');
  console.log('path=>', extension[1].toLowerCase());
  if (extension[1].toLowerCase() !== 'jpg') {
    return res.status(404).json({ message: 'Formato no permitido' });
  }

  const firmaImc = 'firma_';
  const firmaComp = `${firmaImc}${dni}`;
  file.originalname = firmaComp;
  file.filename = firmaComp;


  if (!file) {
    const error = new Error('Seleccione un archivo');
    error.httpStatusCode = 400;
    return next(error);
  }

  try {

const result = await Usuario.findOne({where: {dni: dni}});


    if (!result)
      return res.status(404).json({ message: 'Empleado no Encontrado' });

   result.update({imgfirma: firmaComp})   

    return res.json(result);
  } catch (error) {
    throw new Error(error);
  }
};

const lugarUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const registroDocumento = await RegistroDocumento.findByPk(id);
    const existCode = await RegistroDocumento.findOne({
      where: { codigo: body.codigo },
    });
    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }
    if (!registroDocumento) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    await RegistroDocumento.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      message: 'Registro documento actualizado',
      registro: { ...body },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const lugarDelete = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const registroDocumento = await RegistroDocumento.findByPk(id);
    const nombreDoc = registroDocumento.nombredoc;
    if (!registroDocumento) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    // console.log(registroDocumento);
    await registroDocumento.destroy();
    fs.unlink(`public/uploads/${nombreDoc}`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Archivo eliminado correctamente');
        
      }
    });
    res
      .status(200)
      .json({ message: 'Se elimino con éxito', registroDocumento });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const lugarBlockDelete = (req = request, res = response) => {
  const { body } = req;
  try {
    body.map(async (element, index) => {
      const registroDocumento = await RegistroDocumento.findByPk(element);
      // if (!registroDocumento) {
      //   return res.status(404).json({ message: 'El dato ingresado no existe' });
      // }
      await registroDocumento.update({ estado: false });
      if (body.length - 1 === index) {
        res.status(200).json({ message: 'Se han eliminado con éxito' });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};



export {
  lugarOne,
  lugarAll,
  lugarAdd,
  lugarUpdate,
  lugarDelete,
  lugarBlockDelete,
  lugarAddAll,
  addAllFirm,
  uploadfile,
  firmarDoc,
  getBoletasMay,
  setFirmas
};
