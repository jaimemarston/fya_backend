import Sequelize from 'sequelize';

const sequelize = new Sequelize('sistema', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

export { sequelize };
