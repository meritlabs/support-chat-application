import * as wsService from './websocket.service';

// function for getting web socket created connection
export function getConnection(wss: any, id: any) {
  let result: any = null;
  wss.forEach((item: any) => {
    if (item.id === id) {
      result = item;
    }
  });
  return result;
}

// function for checking is pair exist
export function checkPair(chatPairs, user) {
  let result = chatPairs.find((item: any) => item.get('discordUser') === user || item.get('wsUser') === user);
  if (result === undefined) result = false;
  return result;
}

// Function for executing connected client ID
export function parseConnection(message: string) {
  let connectionID = message.toString().split('@')[0];
  return connectionID.split('help to: ')[1];
}

// Function for creating connected client ID
export function createConnectionID(fakeId: number) {
  return `#${fakeId}-${Date.now()}`;
}

// Function for destroying ws pair
export async function destroyPair(chatPairs: any[], id: any) {
  return new Promise(resolve => {
    let index = chatPairs.indexOf(wsService.checkPair(chatPairs, id));
    if (index > -1) {
      chatPairs.splice(index, 1);
      resolve(chatPairs);
    }
  });
}

// function for detection is connection busy
export function isConnectionBusy(pairs, id) {
  return pairs.find((item: any) => item.wsUser === id);
}

// function for defining application host
export function getHost() {
  let host = `wss://${window.location.host}/`;
  if (/^localhost/.test(window.location.host)) host = `ws://${window.location.host}/`;
  return host;
}
