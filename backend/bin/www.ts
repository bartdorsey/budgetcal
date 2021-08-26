/**
 * Module dependencies.
 */

import debugBuilder from 'debug';
import sequelize from '../sequelizeSetup.js';
import { migrateAll } from '../migrations.js';
import app from '../app.js';
const debug = debugBuilder('backend:server');
import http from 'http';
import { exit } from 'process';
import PrettyError from 'pretty-error';
const pe = new PrettyError();
pe.skipNodeFiles();
const logError = (error: Error) => console.log(pe.render(error));

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('clientError', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException ) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

async function onListening() {
  try {
    await sequelize.query('SELECT 1+1;');
    await migrateAll();
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + port;
    debug('Listening on ' + bind);
  }
  catch (error) {
    logError(error);
    exit(1);
  }
}
