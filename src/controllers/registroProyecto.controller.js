import { request, response } from 'express';
import { validateRegistroProyecto } from '../helpers/schemaRegistroProyecto.js';
import { RegistroProyecto } from '../models/index.js';

const regProyectoOne = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const registroProyecto = await RegistroProyecto.findOne({
      where: { id, estado: true },
    });

    if (!registroProyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.status(200).json({ message: 'Proyecto encontrado', registroProyecto });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const regProyectoAll = async (req = request, res = response) => {
  try {
    const [registroProyecto, count] = await Promise.all([
      RegistroProyecto.findAll({
        order: ['id'],
        where: { estado: true },
      }),
      RegistroProyecto.count({
        where: { estado: true },
      }),
    ]);
    res
      .status(200)
      .json({ message: 'Lista de proyectos', registroProyecto, count });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const regProyectoAdd = async (req = request, res = response) => {
  const { body } = req;
  console.log(body);
  const { error } = validateRegistroProyecto(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }
  try {
    const existCode = await RegistroProyecto.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    const registroProyecto = await RegistroProyecto.create({ ...body });
    res
      .status(201)
      .json({ message: 'Se ha creado con éxito', registroProyecto });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'hable con el administrador', err });
  }
};

const regProyectoAddAll = async (req = request, res = response) => {
  const { body } = req;

  let historial = [];
  let existCode;
  try {
    body.forEach(async (element, index) => {
      const { error } = validateRegistroProyecto(element);

      if (error) {
        console.log('error =>', element);

        historial.push(element);
      } else {
        existCode = await RegistroProyecto.findOne({
          where: { codigo: element.codigo },
        });
        if (existCode) {
          console.log('existe=>', element);

          historial.push(element);
        } else {
          console.log('agregar =>', element);
          await RegistroProyecto.create({ ...element });
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

const regProyectoUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const registroProyecto = await RegistroProyecto.findByPk(id);
    const existCode = await RegistroProyecto.findOne({
      where: { codigo: body.codigo },
    });

    if (existCode) {
      return res.status(404).json({ message: 'El código ya existe' });
    }

    if (!registroProyecto) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }

    await RegistroProyecto.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );

    res.json({
      message: 'Proyecto actualizado',
      lugar: { ...body },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const regProyectoDelete = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const registroProyecto = await RegistroProyecto.findByPk(id);
    if (!registroProyecto) {
      return res.status(404).json({ message: 'El dato ingresado no existe' });
    }
    await registroProyecto.update({ estado: false });
    res.status(200).json({ message: 'Se elimino con éxito', registroProyecto });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const regProyectoBlockDelete = (req = request, res = response) => {
  const { body } = req;
  try {
    body.map(async (element, index) => {
      const registroProyecto = await RegistroProyecto.findByPk(element);
      // if (!registroProyecto) {
      //   return res.status(404).json({ message: 'El dato ingresado no existe' });
      // }
      await registroProyecto.update({ estado: false });
      if (body.length - 1 === index) {
        res.status(200).json({ message: 'Se han eliminado con éxito' });
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

export {
  regProyectoOne,
  regProyectoAll,
  regProyectoAdd,
  regProyectoAddAll,
  regProyectoUpdate,
  regProyectoDelete,
  regProyectoBlockDelete,
};
