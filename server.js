const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const noteRouter = require('./routers/note-router.js');

const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/notes', noteRouter);

module.exports = server;
