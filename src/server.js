const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
require('dotenv-safe').config();
require('./workers/Consumer');

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3001);