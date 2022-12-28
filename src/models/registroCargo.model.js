import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const registroCargo = sequelize.define('registroCargo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
});
