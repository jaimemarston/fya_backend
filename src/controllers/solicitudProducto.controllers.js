import { request, response } from 'express';
import { validateSolicitudProductoSchema } from '../helpers/schemaSolicitudProducto.js';
import {
  RegistroProyecto,
  Solicitud,
  SolicitudProducto,
  LugarComision,
} from '../models/index.js';
import { Op } from 'sequelize';

const solicitudProductoAll = async (req = request, res = response) => {
  const [producto, count] = await Promise.all([
    SolicitudProducto.findAll(),
    SolicitudProducto.count(),
  ]);

  res
    .status(200)
    .json({ message: 'Lista de Productos', data: producto, count });
};

const solicitudProductoAdd = async (req = request, res = response) => {
  const { body } = req;
  // const { solicitudId, partidaPresupuestal } = body;

  const { error } = validateSolicitudProductoSchema(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }

  try {
    // const resultId = await Solicitud.findOne({
    //   where: {
    //     [Op.and]: [{ id: solicitudId }, { estado: true }],
    //   },
    // });

    // const exitsProyecto = await RegistroProyecto.findOne({
    //   where: { id: partidaPresupuestal },
    // });

    // if (!exitsProyecto) {
    //   return res.status(404).json({ message: 'No existe el proyecto' });
    // }

    // if (!resultId) {
    //   return res.status(400).json({ message: 'No existe el usuario' });
    // }

    const producto = await SolicitudProducto.create({ ...body });

    res
      .status(201)
      .json({ message: 'El producto ha sido creado con éxito', producto });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'hable con el administrador' });
  }
};

const solicitudProductoDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await SolicitudProducto.findByPk(id);
  try {
    if (!producto) {
      return res.status(404).json({ message: 'No existe el producto' });
    }
    await SolicitudProducto.destroy({ where: { id } });
    res.json({ message: 'Producto eliminado', producto });
  } catch (error) {
    res.json({ message: 'Hable con el administrador', error });
  }
};

export { solicitudProductoAll, solicitudProductoAdd, solicitudProductoDelete };
