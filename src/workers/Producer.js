const queueActions = require('../util/QueueActions');

async function sendToQueue(queue, message) {
  await queueActions.sendToQueue(queue, message);
}

module.exports = {
  sendToQueue
}