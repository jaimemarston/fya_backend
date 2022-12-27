import { request, response } from 'express';
import { validateLugarSolicitud } from '../helpers/lugarSolicitud.js';
import { LugarComision } from '../models/index.js';

const comisionOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const lugarComision = await LugarComision.findOne({
      where: { id, estado: true },
    });

    if (!lugarComision) {
      return res
        .status(404)
        .json({ message: 'Lugar de comision no encontrado' });
    }
    res.status(200).json({ message: 'Lugar encontrado', lugarComision });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const comisionAll = async (req = request, res = response) => {
  try {
    const [lugar, count] = await Promise.all([
      LugarComision.findAll({
        order: ['id'],
        where: { estado: true },
      }),
      LugarComision.count({
        where: { estado: true },
      }),
    ]);
    res
      .status(200)
      .json({ message: 'Lista de Lugares de comision', lugar, count });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const comisionAdd = async (req = request, res = response) => {
  const { body } = req;
  const { error } = validateLugarSolicitud(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }
  try {
    const existCode = await LugarComision.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    const lugarComision = await LugarComision.create({ ...body });
    res.status(201).json({ message: 'Se ha creado con éxito', lugarComision });
  } catch (err) {
    res.status(400).json({ message: 'hable con el administrador', err });
  }
};

const comisionAddAll = async (req = request, res = response) => {
  const { body } = req;

  let historial = [];
  let existCode;
  try {
    body.forEach(async (element, index) => {
      const { error } = validateLugarSolicitud(element);

      if (error) {
        console.log('error =>', element);

        historial.push(element);
      } else {
        existCode = await LugarComision.findOne({
          where: { codigo: element.codigo },
        });
        if (existCode) {
          console.log('existe=>', element);

          historial.push(element);
        } else {
          console.log('agregar =>', element);
          await LugarComision.create({ ...element });
        }
      }

      if (body.length - 1 === index) {
        const unicos = [...new Set(historial)];
        let respuesta = 'Se ha creado con éxito';
        error ? (respuesta = 'Hubo un error, revise el documento') : '';
        existCode
          ? (respuesta = 'Hay datos repetidos, revise datos del documento')
          : '';
        res.status(201).json({
          message: `${respuesta} `,
          historial: unicos,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'hable con el administrador', err });
  }
};

const comisionUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const lugarComision = await LugarComision.findByPk(id);
    const existCode = await LugarComision.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    if (!lugarComision) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }

    await LugarComision.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: 'Lugar de comision actualizado',
      usuario: { ...body },
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const comisionDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const lugarComision = await LugarComision.findByPk(id);
    if (!lugarComision) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    await lugarComision.update({ estado: false });
    res.status(200).json({ message: 'Se elimino con exito', lugarComision });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const comisionBlockDelete = (req = request, res = response) => {
  const { body } = req;
  try {
    body.map(async (element, index) => {
      const lugarComision = await LugarComision.findByPk(element);
      // if (!lugarComision) {
      //   return res.status(404).json({ message: 'El dato ingresado no existe' });
      // }
      await lugarComision.update({ estado: false });
      if (body.length - 1 === index) {
        res.status(200).json({ message: 'Se han eliminado con exito' });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

export {
  comisionOne,
  comisionAll,
  comisionAdd,
  comisionAddAll,
  comisionUpdate,
  comisionDelete,
  comisionBlockDelete,
};
