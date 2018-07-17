declare const Vue: any;
const template = require('./chat.view.html');
import chatMessage from '../../../common/ts/classes';
import * as wsService from '../../../services/websocket.service';
import * as chatService from '../../services/chat.service';

export default {
  template: template.default,
  data: function() {
    return {
      messages: [],
      socket: new WebSocket(wsService.getHost()),
      interval: '',
      countdown: 10 * 60 * 1000, // in milliseconds
      clientMessage: '',
      initMessage: '',
      isJoined: false,
    };
  },
  created: function() {
    let initMessage = this.$route.query.initMessage;
    let socket = this.socket;
    let _this = this;

    this.$router.replace('/chat'); // remove query params

    switch (chatService.validateInitMessage(initMessage)) {
      case 'valid':
        socket.onopen = function() {
          socket.send(initMessage);
          _this.initMessage = initMessage;
          _this.messages.push(new chatMessage(true, initMessage, 'regular'));
          _this.messages.push(new chatMessage(false, '', 'countdown'));
          _this.startCountDown();
        };
        setInterval(this.keepSocketAwake, 2000);
        break;
      case 'empty':
        this.$router.replace('/');
        break;
      default:
        break;
    }

    socket.onmessage = function(event) {
      let data = JSON.parse(event.data);
      let author = data.author;
      let message = data.message;
      _this.stopCountDown();
      if (message === 'joined') {
        _this.messages.push(new chatMessage(false, `@${author}`, 'joined'));
        _this.isJoined = true;
      } else {
        if (author !== 'ERROR') {
          _this.messages.push(new chatMessage(false, `<small>@${author}:</small>${message}`, 'regular'));
        } else {
          _this.messages.push(new chatMessage(false, `<small>${author}:</small>${message}`, 'error'));
        }
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
      let countdown = (this.countdown -= 1000);
      if (countdown > 0) {
        this.countdown = countdown;
      } else {
        this.sessionExpired();
      }
    },
    sessionExpired: function() {
      let message = `Sorry, your request session expired`;

      this.stopCountDown();
      this.messages.push(new chatMessage(false, message, 'error'));
    },
    keepSocketAwake: function() {
      this.socket.send('');
    },
    sendMessage: function(message) {
      if (message.length > 0) {
        this.socket.send(message);
        this.messages.push(new chatMessage(true, message, 'regular'));
        this.clientMessage = '';
      }
    },
    restartApplication: function() {
      this.$router.push({ path: '/', query: { restartMessage: this.initMessage } });
    },
  },
};
