import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const registroDocumento = sequelize.define('registroDocumento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoDocumento: {
    type: DataTypes.STRING,
  },
});
