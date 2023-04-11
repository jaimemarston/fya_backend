import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const registroEmpleado = sequelize.define('registroEmpleado', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },

  codigo: {
    type: DataTypes.STRING,
  },

  docIdentidad: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  cargo: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },

  rol: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
