import { request, response } from 'express';
import { validateSolicitud } from '../helpers/schemaSolicitud.js';
import {
  RegistroProyecto,
  Solicitud,
  SolicitudProducto,
} from '../models/index.js';

const solicitudAll = async (req = request, res = response) => {
  const [datos, count] = await Promise.all([
    Solicitud.findAll({
      order: ['id'],
      where: { estado: true },
      include: SolicitudProducto,
    }),
    Solicitud.count({ where: { estado: true } }),
  ]);
  // const personal = datos.map(async (item, index) => {
  //   let variable = index + 1;
  //   const exitsProyecto = await RegistroProyecto.findOne({
  //     where: { id: item.nombreProyecto },
  //   });
  //   item.nombreProyecto = exitsProyecto.dataValues.nombreAbreviado;
  //   if (datos.length === variable) {
  //     return item;
  //   }
  //   console.log(item);
  // });

  res
    .status(200)
    .json({ message: 'Lista de usuarios', personal: datos, count });
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
  const { nombreProyecto } = body;
  const { error } = validateSolicitud(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err, error: 'Error al digitar' });
  }

  try {
    const lista = await Solicitud.findAll({
      order: ['id'],
    });

    let nroLista = lista.length + 1;
    let nroSolicitud;

    if (nroLista <= 9) {
      nroSolicitud = `ABC00000${nroLista}`;
    } else if (nroLista <= 99) {
      nroSolicitud = `ABC0000${nroLista}`;
    } else if (nroLista <= 999) {
      nroSolicitud = `ABC000${nroLista}`;
    } else if (nroLista <= 9999) {
      nroSolicitud = `ABC00${nroLista}`;
    } else if (nroLista <= 99999) {
      nroSolicitud = `ABC0${nroLista}`;
    } else {
      nroSolicitud = `ABC${nroLista}`;
    }

    body.numeroSolicitud = nroSolicitud;

    const exitsProyecto = await RegistroProyecto.findOne({
      where: { id: nombreProyecto },
    });
    // console.log('exitsProyecto =>', exitsProyecto);
    if (!exitsProyecto) {
      return res.status(404).json({ message: 'No existe el proyecto' });
    }

    // console.clear();
    // console.log(exitsProyecto);
    // body.lugarComision = lgComision.descripcion;

    // const personal = await Solicitud.findOne({ where: { numeroSolicitud } });

    // if (personal) {
    //   return res.status(404).json({ message: 'Ya existe el personal' });
    // }

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
