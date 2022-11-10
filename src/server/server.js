import express from 'express';
import cors from 'cors';

import { sequelize } from '../database/db.js';
import {
  userRoutes,
  authLogin,
  solicitudProductoRoutes,
  solicitudRoutes,
} from '../routes/index.js';

// import '../models/index.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connection();
    this.middleware();
    this.routes();
  }

  connection = async () => {
    try {
      // await sequelize.sync({ force: true });
      await sequelize.authenticate();
      console.log(`========= Conectado la database =========`);
    } catch (error) {
      console.log(error);
    }
  };

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api', userRoutes);
    this.app.use('/api', authLogin);
    this.app.use('/api', solicitudProductoRoutes);
    this.app.use('/api', solicitudRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`========= Conectado al servidor =========`);
    });
  }
}

export default Server;
