import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt.js';
import { Usuario } from '../models/user.model.js';

const login = async (req, res) => {
  const { body } = req;
  const { password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { email: body.email },
    });

    if (!usuario) {
      return res.status(400).json({ message: 'El correo no existe' });
    }

    if (!usuario.estado) {
      return res
        .status(400)
        .json({ message: 'Hubo un error, hable con el administrador' });
    }

    const validatePassword = bcryptjs.compareSync(password, usuario.password);
    if (!validatePassword) {
      return res
        .status(400)
        .json({ message: 'Las contraseñas no son correctas' });
    }
    // console.log(usuario.id);
    const token = await generateJWT(usuario);

    res.status(200).json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export { login };
