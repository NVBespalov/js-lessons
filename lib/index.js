const staticHandler = require('./handlers/static');
const {jwtAuthHandler, jwtVerifyHandler} = require('./handlers/jwt');
const {createServer} = require('http');

const server = createServer();
const eventsEmitter = server.listen(3000);
eventsEmitter.addListener('request', staticHandler);
eventsEmitter.addListener('request', jwtAuthHandler);
eventsEmitter.addListener('request', jwtVerifyHandler);
