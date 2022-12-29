import { request, response } from 'express';
import { validateRegistroDocumento } from '../helpers/schemaRegistroDocumento.js';
import { RegistroDocumento } from '../models/index.js';

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
    const [lugar, count] = await Promise.all([
      RegistroDocumento.findAll({
        order: ['id'],
        where: { estado: true },
      }),
      RegistroDocumento.count({
        where: { estado: true },
      }),
    ]);
    res
      .status(200)
      .json({ message: 'Lista de registro de documento', lugar, count });
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
  const { body } = req;
  let historial = [];
  let existCode;
  try {
    body.forEach(async (element, index) => {
      const { error } = validateRegistroDocumento(element);

      if (error) {
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
    if (!registroDocumento) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    console.log(registroDocumento);
    await registroDocumento.update({ estado: false });
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
};
