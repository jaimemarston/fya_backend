import { request, response } from 'express';
import { RendicionGastosProducto, RendicionGastos } from '../models/index.js';

const rendGastosProductsAll = (req = request, res = response) => {};

const rendGastosProductsOne = (req = request, res = response) => {};

const rendGastosProductsAdd = async (req = request, res = response) => {
  console.log(req.body);
  try {
    const id = req.body.rendicionGastosId;
    const rendicionGastos = await RendicionGastos.findOne({
      where: { id, estado: true },
    });

    if (!rendicionGastos) {
      return res.status(404).json({ message: 'Id no encontrado' });
    }

    const rendicionGastosProduct = await RendicionGastos.create({ ...body });

    res
      .status(201)
      .json({ message: 'Se ha creado con éxito', rendicionGastos });
  } catch (err) {
    res.status(400).json({ message: 'hable con el administrador', error: err });
  }
};

const rendGastosProductsUpdate = (req = request, res = response) => {};

const rendGastosProductsDelete = (req = request, res = response) => {};

const rendGastosProductsBlockDelete = (req = request, res = response) => {};

export {
  rendGastosProductsAll,
  rendGastosProductsOne,
  rendGastosProductsAdd,
  rendGastosProductsUpdate,
  rendGastosProductsDelete,
  rendGastosProductsBlockDelete,
};
