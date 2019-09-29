import * as tmi from 'tmi.js';

const opts: tmi.Options = {
  identity: {
    username: 'notsoglados',
    password: process.env.NOTSOGLADOSKEY,
  },
  channels: [
    'youmonster',
  ],
};

const client: tmi.Client = new (tmi.client as any)(opts);

function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}

client.on('connected', onConnectedHandler);
client.connect();
