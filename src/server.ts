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
import { messageTypes, strings } from './common/ts/const';

const Filter = require('bad-words');
const detectRudeWords = new Filter({ placeHolder: '♥' });

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

//run server
server.listen(PORT, () => {
  console.log(`Server started on port ${(server.address() as any).port}`);
});

// Create new WS connection
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
    let pair = wsService.checkPair(chatPairs, connectionID);
    let discordUser = (ws as any).discordUser;

    message = detectRudeWords.clean(message);

    if (pair && discordUser && message.length > 0) {
      console.log(compileMessage.regularMessage(pair.get('wsUser'), message));

      discordUser.send(compileMessage.regularMessage(pair.get('wsUser'), message));
    } else if (!pair && message.length > 2) {
      // discordService.sendToChannels(discordClient, CHANNELS, compileMessage.helpRequest(message, connectionID));
      console.log(compileMessage.helpRequest(message, connectionID));
    } else if (DEBUG && connectionID) {
      console.log(`DEBUG__BE__AWAKE__IM__HERE__${connectionID}`);
    }
  });
  ws.on('close', function(connection) {
    let pair = wsService.checkPair(chatPairs, connectionID);
    let discordUser = (ws as any).discordUser;

    if (pair && discordUser) {
      (async () => {
        chatPairs = (await wsService.destroyPair(chatPairs, pair.discordUser)) as any[];
        discordUser.send(compileMessage.pairDestroyed());
      })();
    }
  });
});

discordClient.on('message', (message: any) => {
  if (DEBUG) {
    console.log('START__DEBUG__PRESENT_CONNECTIONS___');
    console.log(awaitingQueue);
    console.log('END__DEBUG__PRESENT_CONNECTIONS___');
  }

  let type: string = message.channel.type;
  let _message: string = detectRudeWords.clean(message.content);
  let isBot = message.author.bot;

  if (type === 'dm' && !isBot) {
    let discordUser: any = message.channel.recipient.username;
    let pair = wsService.checkPair(chatPairs, discordUser);
    let isCommand = discordService.detectCommand(_message);
    let detectedMessageType = discordService.detectMessageType(pair, isCommand, isBot);

    if (DEBUG) {
      console.log('START___DEBUG___PAIR___');
      console.log(pair);
      console.log('END___DEBUG___PAIR___');
    }

    switch (detectedMessageType) {
      case messageTypes.joinToPair:
        let connectionID = wsService.parseConnection(_message);
        let connection = wsService.getConnection(awaitingQueue, connectionID);
        let unableToConnectMessage = compileMessage.unableToConnect();
        let isConnectionBusy;

        if (connection) isConnectionBusy = wsService.isConnectionBusy(chatPairs, connection.id);

        if (DEBUG) {
          console.log('START___IS_CONNECTION_BUSY___');
          console.log(isConnectionBusy);
          console.log('END___IS_CONNECTION_BUSY___');
        }

        if (connection && !connection.connected && !isConnectionBusy) {
          connection.discordUser = message.author; //attach Discord user to the new connection pair
          connection.connected = true;

          let newPair = new chatPair(discordUser, connection.id);

          let discordUserJoinedMessage = JSON.stringify(new wsMessage(discordUser, strings.joined));
          let successfulConnectedToClientMessage = compileMessage.connectedToClient(connection.id);
          let clientTakenMessage = compileMessage.requestTaken(connection.id, discordUser);

          chatPairs.push(newPair); // Add created pair to WS

          connection.send(discordUserJoinedMessage); // Send connection message to the Application client
          message.author.send(successfulConnectedToClientMessage); // Reply to author that he's successfully connected to the application client
          discordService.sendToChannels(discordClient, CHANNELS, clientTakenMessage); // Notify community that somebody from the community already connected to the existing application client
        } else {
          message.author.send(unableToConnectMessage); // Notify Discord user that He's can't connect to the current Application client
        }
        break;
      case messageTypes.regularMessage:
        (() => {
          let connection = wsService.getConnection(awaitingQueue, pair.get('wsUser'));
          let message = JSON.stringify(new wsMessage(discordUser, _message));

          if (connection) connection.send(message);
        })();
        break;
      case messageTypes.inPair:
        message.author.send(compileMessage.alreadyInPair(pair.get('wsUser')));
        break;
      case messageTypes.destroyPair:
        if (pair) {
          (async () => {
            let connection = wsService.getConnection(awaitingQueue, pair.get('wsUser'));
            let userDisconnectedMessage = JSON.stringify(new wsMessage('ERROR', compileMessage.disconnected()));
            connection.send(userDisconnectedMessage);
            chatPairs = (await wsService.destroyPair(chatPairs, pair.discordUser)) as any[];
            message.author.send(compileMessage.pairDestroyed());
          })();
        } else {
          message.author.send(compileMessage.noActiveConnections());
        }
        break;
      case messageTypes.botHelp:
        message.author.send(compileMessage.getHelp()); // Post to Discord user help message
        break;
      case messageTypes.howToUse:
        message.author.send(compileMessage.howToUse()); // Post to Discord user how to use message
        break;
      case messageTypes.default:
        message.author.send(compileMessage.defaultException()); // Post to Discord user default exception
        break;
      default:
        break;
    }
  }
});
