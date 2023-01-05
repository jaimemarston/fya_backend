import { request, response } from 'express';
import { validateRendicionGastos } from '../helpers/schemaRendicionGastos.js';
import { RendicionGastos } from '../models/index.js';

const rendGastosOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const rendicionGastos = await RendicionGastos.findOne({
      where: { id, estado: true },
    });

    if (!rendicionGastos) {
      return res
        .status(404)
        .json({ message: 'Lugar de comisión no encontrado' });
    }
    res.status(200).json({ message: 'Lugar encontrado', rendicionGastos });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const rendGastosAll = async (req = request, res = response) => {
  try {
    const [rendicionGastos, count] = await Promise.all([
      RendicionGastos.findAll({
        order: ['id'],
        where: { estado: true },
      }),
      RendicionGastos.count({
        where: { estado: true },
      }),
    ]);
    res.status(200).json({
      message: 'Lista de lugares de comisión',
      rendicionGastos,
      count,
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const rendGastosAdd = async (req = request, res = response) => {
  const { body } = req;
  const { error } = validateRendicionGastos(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }
  console.log(error);
  // console.log(body);
  try {
    //  const existCode = await RegistroActividad.findOne({
    //    where: { codigo: body.codigo },
    //  });

    //  if (existCode) {
    //    return res.status(404).json({ message: 'El código ya existe' });
    //  }

    const rendicionGastos = await RendicionGastos.create({ ...body });
    res
      .status(201)
      .json({ message: 'Se ha creado con éxito', rendicionGastos });
  } catch (err) {
    // console.log('=>', err);
    res.status(400).json({ message: 'hable con el administrador', err });
  }
};

const rendGastosUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const rendicionGastos = await RendicionGastos.findByPk(id);

    if (!rendicionGastos) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }

    await RendicionGastos.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: 'Lugar de comisión actualizado',
      lugar: { ...body },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const rendGastosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const rendicionGastos = await RendicionGastos.findByPk(id);
    if (!rendicionGastos) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    await rendicionGastos.update({ estado: false });
    res.status(200).json({ message: 'Se elimino con éxito', rendicionGastos });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const rendGastosBlockDelete = (req = request, res = response) => {
  const { body } = req;
  try {
    body.map(async (element, index) => {
      const rendicionGastos = await RendicionGastos.findByPk(element);
      // if (!rendicionGastos) {
      //   return res.status(404).json({ message: 'El dato ingresado no existe' });
      // }
      await rendicionGastos.update({ estado: false });
      if (body.length - 1 === index) {
        res.status(200).json({ message: 'Se han eliminado con éxito' });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

export {
  rendGastosAll,
  rendGastosOne,
  rendGastosAdd,
  rendGastosUpdate,
  rendGastosDelete,
  rendGastosBlockDelete,
};
