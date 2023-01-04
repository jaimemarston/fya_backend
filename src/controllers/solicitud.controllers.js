import { request, response } from 'express';
import { validateSolicitud } from '../helpers/schemaSolicitud.js';
import { Solicitud, SolicitudProducto } from '../models/index.js';

const solicitudAll = async (req = request, res = response) => {
  const [personal, count] = await Promise.all([
    Solicitud.findAll({
      order: ['id'],
      where: { estado: true },
      include: SolicitudProducto,
    }),
    Solicitud.count({ where: { estado: true } }),
  ]);

  res.status(200).json({ message: 'Lista de usuarios', personal, count });
};

const solicitudOne = async (req = request, res = response) => {
  const { id } = req.params;
  const [personal, producto] = await Promise.all([
    Solicitud.findByPk(id),
    SolicitudProducto.findAll({
      where: { solicitudId: id },
    }),
  ]);

  if (!personal) {
    return res.status(404).json({ message: 'No existe el personal' });
  }
  const { dataValues } = {
    ...personal,
  };
  dataValues.productos = producto;

  const suma = producto
    .map((item) => {
      let variable = Number(item.importe);
      return variable;
    })
    .reduce((prev, curr) => prev + curr, 0);

  res.status(200).json({
    message: 'Personal encontrado',
    personal: dataValues,
    total: suma,
  });
};

const solicitudAdd = async (req = request, res = response) => {
  const { body } = req;

  const { error } = validateSolicitud(req.body);

  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }

  try {
    const lista = await Solicitud.findAll({
      order: ['id'],
    });

    let numeroSolicitud = `ABC0000${lista.length + 1}`;
    body.numeroSolicitud = numeroSolicitud;
    const personal = await Solicitud.findOne({ where: { numeroSolicitud } });

    if (personal) {
      return res.status(404).json({ message: 'Ya existe el personal' });
    }

    const newPersonal = await Solicitud.create({ ...body });

    res.status(201).json({
      message: 'El personal ha sido creado con éxito',
      personal: newPersonal,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Hable con el administrador', err });
  }
};

const solicitudUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  const personal = await Solicitud.findByPk(id);

  if (!personal) {
    return res.status(404).json({ message: 'No existe el personal' });
  }

  await Solicitud.update(
    { ...body },
    {
      where: {
        id,
      },
    }
  );

  res.json({ message: 'Personal actualizado', personal: { ...body } });
};

const solicitudDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const personal = await Solicitud.findByPk(id);
  if (!personal) {
    return res.status(404).json({ message: 'No existe el personal' });
  }
  console.log(personal);

  await personal.update({ estado: false });
  res.json({ message: 'Personal eliminado', personal });
};

export {
  solicitudAll,
  solicitudOne,
  solicitudAdd,
  solicitudUpdate,
  solicitudDelete,
};
