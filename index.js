const { router } = require('./src/router.js');
const { startServer } = require('./src/server.js');
const commonHandlers = require('./src/DefaultHandler.js');

module.exports = { startServer, router, commonHandlers };
