const utils = require('../util/Utils');
const jwt = require('jsonwebtoken');
const api = require('../services/api');

async function store(req, res) {
  const username = req.body.username;
  const password = await utils.hashPassword(req.body.password);

  const response = await api.post('/signup', { username, password });
  if (response.data.action === 'signup') {
    return res.json({ code: 200, message: `User ${response.data.user.username} successfully created.` });
  }
  if (response.data.action === 'error') {
    return res.json({ code: 400, message: response.data.message });
  }
}

async function index(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const response = await api.post('/login', { username })

  const isSamePassword = await utils.comparePassword(password, response.data.password);
  if (isSamePassword) {
    const { id } = response.data;
    const token = await jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 18000
    });
    const data = {
      token: token,
      username: response.data.username
    }
    return res.json(data);
  }

  return res.json({ message: 'Invalid username or password.' })
}

async function logout(req, res) {
  return res.json({ auth: false, token: null });
}

module.exports = {
  store,
  index,
  logout
}