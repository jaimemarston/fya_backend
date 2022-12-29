import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const RegistroDocumento = sequelize.define('registroDocumento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  tipoDocumento: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
