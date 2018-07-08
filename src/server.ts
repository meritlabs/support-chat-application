declare var process: any;

import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as Discord from 'discord.js';

import * as expressService from './services/express.service';
import * as wsService from './services/websocket.service';
import * as compileMessage from './services/compile-message.service';
import * as discordService from './services/discord.service';
import { chatPair, wsMessage } from './common/ts/classes';

const app = express(),
  server = http.createServer(app),
  discordClient = new Discord.Client(),
  GUILD_NAME = process.env.GUILD_NAME || '',
  CHANNELS = process.env.CHANNELS || '',
  BOT_TOKEN = process.env.BOT_TOKEN || '',
  APP_SLUG = process.env.APP_SLUG || ['/get-help/'],
  PORT = process.env.PORT || 8999,
  DEBUG = process.env.DEBUG || false,
  WALLET_APPLICATION = process.env.WALLET_APPLICATION || 'https://testnet.wallet.merit.me/',
  MWS_URL = process.env.MWS_URL || 'https://testnet.mws.merit.me/bws/api/v1/';

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

//Discord bot login
discordClient.login(BOT_TOKEN);

// Post application params
expressService.formConfig(app, { wallet: WALLET_APPLICATION, mws: MWS_URL });

// Serve invite application
app.use(APP_SLUG, express.static('./dist/server/chat-form'));

let fakeId: number = 0;
let chatPairs: any[];
let awaitingQueue: any[];

chatPairs = [];
awaitingQueue = [];

wss.on('connection', (ws: WebSocket) => {
  let connectionID = wsService.createConnectionID(fakeId++);

  (ws as any).id = connectionID;
  (ws as any).connected = false;
  awaitingQueue.push(ws);

  if (DEBUG) {
    console.log('START__DEBUG__CREATED_CONNECTION___');
    console.log(awaitingQueue);
    console.log('END__DEBUG__CREATED_CONNECTION___');
  }
  ws.on('message', (message: string) => {
    if (message.length > 2) {
      discordService.sendToChannels(discordClient, CHANNELS, compileMessage.helpRequest(message, connectionID));
    } else {
      if (DEBUG) {
        console.log(`DEBUG__BE__AWAKE__IM__HERE__${connectionID}`);
      }
    }
  });
});

//run server
server.listen(PORT, () => {
  console.log(`Server started on port ${(server.address() as any).port}`);
});
