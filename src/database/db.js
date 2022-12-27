import Sequelize from 'sequelize';

const sequelize = new Sequelize('ote', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

export { sequelize };
