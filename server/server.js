import Koa from 'koa';
import Router from 'koa-router';
import Sequelize from 'sequelize';

import logger from 'koa-logger';
import responseTime from 'koa-response-time';

import config from '../config';

import router from './routes';

const port = process.env.PORT || config.server.port;

const server = new Koa();

// Connects to the database
const sequelize = new Sequelize(config.database.db, config.database.user, config.database.password, {
  dialect: 'postgres',
  port: config.database.port,
  host: config.database.host,
});

// Logs requests made and reponses sent
server.use(logger());

// Adds a X-Response-Time in the response header
server.use(responseTime());

// response middleware
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World';
});

// Connects all of the api endpoint routes
server.use(router.routes());

server.listen(port, () => console.log('Running at http://localhost:' + port));

export default server;