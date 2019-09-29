import TMI from 'tmi.js';
import { onMessageHandler } from './handlers/message-handler';

const opts = {
  identity: {
    username: 'notsoglados',
    password: process.env.NOTSOGLADOSKEY,
  },
  channels: [
    'youmonster',
  ]
};

// Create a client with our options
const client = TMI.client(opts);

// Register our event handlers (defined below)
client.on('message', (target, context, msg, self) => { onMessageHandler({
  client, target, context, msg, self,
}); });
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
