import { request, response } from 'express';
import { Usuario } from '../models/index.js';
import bcryptjs from 'bcryptjs';
import { validateUserSchema } from '../helpers/schemaUser.js';

const userAll = async (req = request, res = response) => {
  const [usuario, count] = await Promise.all([
    Usuario.findAll({
      order: ['id'],
    }),
    Usuario.count(),
  ]);
  res.status(200).json({ message: 'Lista de usuarios', usuario, count });
};

const userOne = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({
    where: { id },
  });

  if (!usuario) {
    return res.status(404).json({ message: 'No existe el usuario' });
  }

  res.status(200).json({ message: 'Usuario encontrado', usuario });
};

const userAdd = async (req = request, res = response) => {
  const { body } = req;

  const { error } = validateUserSchema(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).json({ message: err });
  }

  try {
    const existEmail = await Usuario.findOne({
      where: { email: body.email },
    });

    if (existEmail) {
      return res.status(404).json({ message: 'El correo ya existe' });
    }
    // TODO Encriptando password
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(body.password, salt);

    const usuario = await Usuario.create({ ...body });

    res.status(201).json({ message: 'Usuario creado con éxito', usuario });
  } catch (error) {
    console.log('=>', error);
    throw new Error(error);
  }
};

const userUpdate = async (req = request, res = response) => {
  const { id } = req.params;
  const { body } = req;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({ message: 'El usuario no existe' });
  }

  // TODO Encriptando password
  const salt = bcryptjs.genSaltSync(10);
  body.password = bcryptjs.hashSync(body.password, salt);
  await Usuario.update(
    { ...body },
    {
      where: {
        id,
      },
    }
  );

  res.json({ message: 'Usuario actualizado', usuario: { ...body } });
};

const userDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  const usuarioAutenticado = req.usuario;
  if (!usuario) {
    return res.status(404).json({ message: 'No existe el usuario' });
  }
  await usuario.update({ estado: false });
  res.json({ message: 'Usuario eliminado', usuario, usuarioAutenticado });
};

export { userAll, userOne, userAdd, userUpdate, userDelete };
