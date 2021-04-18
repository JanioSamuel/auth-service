const jwt = require('jsonwebtoken');
const queueActions = require('../util/QueueActions');
const utils = require('../util/Utils');
const producer = require('./Producer');

function consume(password) {
  return queueActions.consume('auth.service.ret', async message => {
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

      console.log('TOKEN: ', token);

      console.log('Retorno token: ', token);
      return { token };
    } else {
      return { message: 'Invalid username or password.' };
    }
  });
}

module.exports = {
  consume
}
  // producer.sendToQueue('frontend.service', { auth: true, token: token });
