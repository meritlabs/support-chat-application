declare const Vue: any;
const template = require('./chat.view.html');
import chatMessage from '../../../common/ts/classes';
import * as wsService from '../../../services/websocket.service';
import { callbackify } from 'util';

export default {
  template: template.default,
  data: function() {
    return {
      messages: [],
      socket: new WebSocket(wsService.getHost()),
      interval: '',
      countdown: 15 * 60 * 1000, // in milliseconds
      clientMessage: '',
      isJoined: false,
    };
  },
  created: function() {
    let initMessage = this.$route.query.initMessage;
    let socket = this.socket;
    let _this = this;
    socket.onopen = function() {
      socket.send(initMessage);
      _this.messages.push(new chatMessage(true, initMessage, 'regular'));
      _this.messages.push(new chatMessage(false, '', 'countdown'));
      _this.startCountDown();
    };
    setInterval(this.keepSocketAwake, 2000);
    socket.onmessage = function(event) {
      let data = JSON.parse(event.data);
      let author = data.author;
      let message = data.message;
      _this.stopCountDown();
      if (message === 'joined') {
        _this.messages.push(new chatMessage(false, `@${author}`, 'joined'));
        _this.isJoined = true;
      } else {
        _this.messages.push(new chatMessage(false, `@${author}: ${message}`, 'regular'));
      }
    };
  },
  methods: {
    startCountDown: function() {
      this.interval = setInterval(this.updateTimer, 1000);
    },
    stopCountDown: function() {
      clearInterval(this.interval);
    },
    updateTimer: function() {
      this.countdown -= 1000;
    },
    keepSocketAwake: function() {
      this.socket.send('');
    },
    sendMessage: function(message) {
      this.socket.send(message);
      this.messages.push(new chatMessage(true, message, 'regular'));
      this.clientMessage = '';
    },
  },
};
