import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const registroPresupuesto = sequelize.define('registroPresupuesto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: DataTypes.INTEGER,
  },
  proyecto: {
    type: DataTypes.STRING,
  },
  equivalentesTecnicos: {
    type: DataTypes.STRING,
  },
});
