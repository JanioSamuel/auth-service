const axios = require('axios');
require('dotenv-safe').config();

const api = axios.create({
  baseURL: process.env.RELATIONAL_DB_SERVICE_URL
});

module.exports = api;