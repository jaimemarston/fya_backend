import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env);

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: 'db',
  dialect: 'postgres',
  logging: false,
  port: process.env.POSTGRES_PORT,
});

export { sequelize };
