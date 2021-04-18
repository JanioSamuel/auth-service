const producer = require('../workers/Producer');
const utils = require('../util/Utils');
const queueActions = require('../util/QueueActions');
const jwt = require('jsonwebtoken');

async function store(req, res) {
  const username = req.body.username;
  const password = await utils.hashPassword(req.body.password);

  await producer.sendToQueue('relational.db.service', { username, password, action: 'signup' });
  return queueActions.consume('auth.service', message => {
    if (!JSON.parse(message.content)) {
      throw new Error('User not found');
    }
    const content = JSON.parse(message.content);
    if (content.action === 'signup') {
      return res.json({ code: 200, message: `User ${content.user.username} successfully created.` });
    }
    if (content.action === 'error') {
      return res.json({ code: 400, message: content.message });
    }
  })
}

async function index(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  await producer.sendToQueue('relational.db.service', { username });

  return queueActions.consume('auth.service', async message => {
    if (!JSON.parse(message.content)) {
      throw new Error('User not found');
    }

    const content = JSON.parse(message.content);

    const isSamePassword = await utils.comparePassword(password, content.password);
    if (isSamePassword) {
      const { id } = content;
      const token = await jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 18000
      });

      return res.json({ token })
    }

    return res.json({ message: 'Invalid username or password.' })
  });
}

module.exports = {
  store,
  index
}