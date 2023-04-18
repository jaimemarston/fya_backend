import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';
import { registroEmpleado } from './registroEmpleado.model.js';

export const RegistroDocumento = sequelize.define('registroDocumento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo: {
    type: DataTypes.STRING,
  },
  nombredoc: {
    type: DataTypes.STRING,
  },
  ndocumento: {
    type: DataTypes.STRING,
  },
nomfile: {
    type: DataTypes.STRING,
  },
  codemp: {
    type: DataTypes.STRING,
  },
  anio: {
    type: DataTypes.STRING,
  },
  mes: {
    type: DataTypes.STRING,
  },
  numerodoc: {
    type: DataTypes.STRING,
  },
  tipodoc: {
    type: DataTypes.STRING,
  },

  fechafirma: {
    type: DataTypes.STRING,
  },
  fechaenvio: {
    type: DataTypes.DATEONLY,
    defaultValue: sequelize.literal('CURRENT_DATE'),
  },
  
  fechadoc: {
    type: DataTypes.STRING,
  },
  
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

/* RegistroDocumento.belongsTo(registroEmpleado, { foreignKey: 'ndocumento' }); */
