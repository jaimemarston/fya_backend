import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const registroProyecto = sequelize.define('registroProyecto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigoContable: {
    type: DataTypes.STRING,
  },
  nombreAbreviado: {
    type: DataTypes.STRING,
  },
  nombreCompleto: {
    type: DataTypes.STRING,
  },
});
