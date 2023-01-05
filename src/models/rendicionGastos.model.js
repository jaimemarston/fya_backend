import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const RendicionGastos = sequelize.define('rendicionGastos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreApellido: {
    type: DataTypes.STRING,
  },
  proyecto: {
    type: DataTypes.STRING,
  },
  lugarComision: {
    type: DataTypes.INTEGER,
  },
  objetoComision: {
    type: DataTypes.STRING,
  },
  fechaInicio: {
    type: DataTypes.STRING,
  },
  fechaFin: {
    type: DataTypes.STRING,
  },
  recibido: {
    type: DataTypes.STRING,
  },
  rendido: {
    type: DataTypes.STRING,
  },
  saldo: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
