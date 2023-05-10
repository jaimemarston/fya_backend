import { request, response } from 'express';
import { validateRegistroDocumento } from '../helpers/schemaRegistroDocumento.js';
import { RegistroDocumento, Usuario, registroEmpleado } from '../models/index.js';
import fs from "fs";
import multer from "multer";
import {PDFDocument}  from 'pdf-lib';



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

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
    const doc = {
      tipodoc: docData.originalname.split("_")[0],
      nombredoc:docData.originalname,
      ndocumento: docData.originalname.split("_")[1]

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
        const doc = {
          tipodoc: docData.originalname.split("_")[1],
          nombredoc:docData.originalname.replace('firmado_', ''),
          ndocumento: docData.originalname.split("_")[2],
          estado: true
    
        }
        return doc
      }else {
        const doc = {
          tipodoc: docData.originalname.split("_")[0],
          nombredoc:docData.originalname,
          ndocumento: docData.originalname.split("_")[1],
          estado: true
    
        }
        return doc
      }

    } )

  console.log(documentsData)
  const regDoc = await RegistroDocumento.bulkCreate(documentsData, {
    ignoreDuplicates: true
  })


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
  const imageBytes = fs.readFileSync(process.cwd() + `/public/uploads/firmas/${user.imgfirma}.jpg`);

  const image = await pdfDoc.embedJpg(imageBytes);
  page.drawImage(image, {
/*       x: x - image.width / 2, // Ajusta la posición de la imagen
    y: y - image.height / 2, */
    x: 70,
    y: 60 ,
    width: 50,
    height: 50,
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
const fechaPlana = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
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
  firmarDoc
};
