declare var process: any;

import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as Discord from 'discord.js';

import { chatPair, wsMessage } from './common/ts/classes';

const app = express(),
  server = http.createServer(app),
  discordClient = new Discord.Client(),
  GUILD_NAME = process.env.GUILD_NAME || '',
  CHANNELS = process.env.CHANNELS || '',
  BOT_TOKEN = process.env.BOT_TOKEN || '',
  APP_SLUG = process.env.APP_SLUG || '/get-invite',
  PORT = process.env.PORT || 8999,
  DEBUG = process.env.DEBUG || false,
  WALLET_APPLICATION = process.env.WALLET_APPLICATION || 'https://testnet.wallet.merit.me/',
  MWS_URL = process.env.MWS_URL || 'https://testnet.mws.merit.me/bws/api/v1/';

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

//Discord bot login
discordClient.login(BOT_TOKEN);

//start server
server.listen(PORT, () => {
  console.log(`Server started on port ${(server.address() as any).port}`);
});
