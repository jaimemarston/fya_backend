import { request, response } from 'express';
import { validateSolicitudProductoSchema } from '../helpers/schemaSolicitudProducto.js';
import { Solicitud, SolicitudProducto } from '../models/index.js';
import { Op } from 'sequelize';

const solicitudProductoAll = async (req = request, res = response) => {
  const [producto, count] = await Promise.all([
    SolicitudProducto.findAll(),
    SolicitudProducto.count(),
  ]);
  // const data = count + 1;
  res.status(200).json({ message: 'Lista de Productos', producto, count });
};

const solicitudProductoAdd = async (req = request, res = response) => {
  const { body } = req;
  const { solicitudId } = body;

  const { error } = validateSolicitudProductoSchema(req.body);
  if (error) {
    console.log(error);
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }

  try {
    const resultId = await Solicitud.findOne({
      where: {
        [Op.and]: [{ id: solicitudId }, { estado: true }],
      },
    });

    if (!resultId) {
      return res.status(400).json({ message: 'No existe el usuario' });
    }

    const producto = await SolicitudProducto.create({ ...body });

    res
      .status(201)
      .json({ message: 'El producto ha sido creado con éxito', producto });
  } catch (error) {
    throw new Error(error);
  }
};

const solicitudProductoDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await SolicitudProducto.findByPk(id);

  if (!producto) {
    return res.status(404).json({ message: 'No existe el producto' });
  }

  // await SolicitudProducto.update({ estado: false });
  await SolicitudProducto.destroy({ where: { id } });
  res.json({ message: 'Producto eliminado', producto });
};

export { solicitudProductoAll, solicitudProductoAdd, solicitudProductoDelete };
