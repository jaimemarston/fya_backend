import { request, response } from 'express';
import { validateRegistroCargo } from '../helpers/schemaRegistroCargo.js';
import { RegistroCargo } from '../models/index.js';

const cargoOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const registroCargo = await RegistroCargo.findOne({
      where: { id, estado: true },
    });

    if (!registroCargo) {
      return res
        .status(404)
        .json({ message: 'Lugar de comisión no encontrado' });
    }
    res
      .status(200)
      .json({ message: 'Lugar encontrado', lugarComision: registroCargo });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const cargoAll = async (req = request, res = response) => {
  try {
    const [registroCargo, count] = await Promise.all([
      RegistroCargo.findAll({
        order: ['id'],
        where: { estado: true },
      }),
      RegistroCargo.count({
        where: { estado: true },
      }),
    ]);
    res
      .status(200)
      .json({ message: 'Lista de registro de cargo', registroCargo, count });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const cargoAdd = async (req = request, res = response) => {
  const { body } = req;
  const { error } = validateRegistroCargo(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }
  try {
    const existCode = await RegistroCargo.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    const registroCargo = await RegistroCargo.create({ ...body });
    res.status(201).json({ message: 'Se ha creado con éxito', registroCargo });
  } catch (err) {
    res.status(400).json({ message: 'hable con el administrador', err });
  }
};

const cargoAddAll = async (req = request, res = response) => {
  const { body } = req;

  let historial = [];
  let existCode;
  try {
    body.forEach(async (element, index) => {
      const { error } = validateRegistroCargo(element);

      if (error) {
        console.log('error =>', element);

        historial.push(element);
      } else {
        existCode = await RegistroCargo.findOne({
          where: { codigo: element.codigo },
        });
        if (existCode) {
          console.log('existe=>', element);

          historial.push(element);
        } else {
          console.log('agregar =>', element);
          await RegistroCargo.create({ ...element });
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

const cargoUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const registroCargo = await RegistroCargo.findByPk(id);
    const existCode = await RegistroCargo.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    if (!registroCargo) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }

    await RegistroCargo.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: 'Lugar de comision actualizado',
      registroCargo: { ...body },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const cargoDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const registroCargo = await RegistroCargo.findByPk(id);
    if (!registroCargo) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    await registroCargo.update({ estado: false });
    res.status(200).json({ message: 'Se elimino con éxito', registroCargo });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const cargoBlockDelete = (req = request, res = response) => {
  const { body } = req;
  try {
    body.map(async (element, index) => {
      const registroCargo = await RegistroCargo.findByPk(element);
      // if (!registroCargo) {
      //   return res.status(404).json({ message: 'El dato ingresado no existe' });
      // }
      await registroCargo.update({ estado: false });
      if (body.length - 1 === index) {
        res.status(200).json({ message: 'Se han eliminado con exito' });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

export {
  cargoOne,
  cargoAll,
  cargoAdd,
  cargoAddAll,
  cargoUpdate,
  cargoDelete,
  cargoBlockDelete,
};
