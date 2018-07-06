// Class of the chat pair
export class chatPair {
  discordUser: string;
  wsUser: string;
  constructor(discordUser: string, wsUser: string) {
    this.discordUser = discordUser;
    this.wsUser = wsUser;
  }
  get(param) {
    return this[param];
  }
}

// Class of the web socket message
export class wsMessage {
  author: string;
  message: string;
  constructor(author: string, message: string) {
    this.author = author;
    this.message = message;
  }
}

// Class for new chat form message
export default class chatMessage {
  author: string;
  message: string;
  timestamp: any;
  constructor(author: string, message: string) {
    this.author = author;
    this.message = message;
    this.timestamp = new Date();
  }
}
