import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const registroCodigoReferencia = sequelize.define(
  'registroCodigoReferencia',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
  }
);
