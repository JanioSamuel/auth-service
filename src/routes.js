const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController');

routes.post('/signup', AuthController.store);
routes.post('/login', AuthController.index);
// routes.post('/logout', AuthController.logout);

module.exports = routes;