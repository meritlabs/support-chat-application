declare const Vue: any;
declare const window: any;
const template = require('./chat.view.html');
import chatMessage from '../../../common/ts/classes';
import * as wsService from '../../../services/websocket.service';
import * as chatService from '../../services/chat.service';

export default {
  template: template.default,
  data: function() {
    return {
      messages: [],
      socket: null,
      countdownInterval: null,
      awakeInterval: null,
      countdown: 10 * 60 * 1000, // in milliseconds
      clientMessage: '',
      initMessage: '',
      isJoined: false,
      isThanksEnabled: true,
      isNotRated: true,
      connectedUser: '',
    };
  },
  created: function() {
    let initMessage = this.$route.query.initMessage;
    let _this = this;

    this.$router.replace('/chat'); // remove query params

    switch (chatService.validateInitMessage(initMessage)) {
      case 'valid':
        _this.socket = new WebSocket(wsService.getHost());

        _this.socket.onopen = function() {
          _this.socket.send(initMessage);
          _this.initMessage = initMessage;
          _this.messages.push(new chatMessage(true, initMessage, 'regular'));
          _this.messages.push(new chatMessage(false, '', 'countdown'));
          _this.startCountDown();
        };
        this.awakeInterval = setInterval(this.keepSocketAwake, 2000);
        break;
      case 'empty':
        this.$router.replace('/');
        break;
      default:
        break;
    }

    _this.socket.onmessage = function(event) {
      let data = JSON.parse(event.data);
      let author = data.author;
      let message = data.message;
      _this.stopCountDown();
      if (message === 'joined') {
        _this.messages.push(
          new chatMessage(false, `<strong>@${author}</strong> from Discord community, joined to help you!`, 'success')
        );
        _this.isJoined = true;
        _this.connectedUser = author;
        this.sendRateEv(1);
      } else {
        if (author !== 'ERROR') {
          _this.messages.push(new chatMessage(false, `<small>@${author}:</small>${message}`, 'regular'));
        } else {
          _this.messages.push(new chatMessage(false, `<small>${author}:</small>${message}`, 'error'));
          _this.isJoined = false;
          _this.shutDownConnection();
        }
      }
    };
  },
  methods: {
    startCountDown: function() {
      this.countdownInterval = setInterval(this.updateTimer, 1000);
    },
    stopCountDown: function() {
      clearInterval(this.countdownInterval);
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
    shutDownConnection: function() {
      clearInterval(this.awakeInterval);
    },
    sendMessage: function(message) {
      if (message.length > 0 && this.isJoined) {
        this.socket.send(message);
        this.messages.push(new chatMessage(true, message, 'regular'));
        this.clientMessage = '';
      } else {
        this.messages.push(new chatMessage(false, `<small>ERROR:</small> Oooops, unexpected error!`, 'error'));
      }
    },
    restartApplication: function() {
      this.$router.push({ path: '/', query: { restartMessage: this.initMessage } });
    },
    finishChat: function() {
      this.isJoined = false;
      this.isThanksEnabled = false;
      this.messages.push(new chatMessage(false, ``, 'rateHelp'));
    },
    sendRateEv: function(val) {
      (window as any).gtag('event', 'Connection', {
        event_category: 'Analytic',
        event_action: 'Connection',
        event_label: `_${this.connectedUser}_at_Discord`,
        value: val, // Application loaded
      });
    },
    rateHelp: function(val) {
      this.messages.push(new chatMessage(false, `<small>MERIT TEAM:</small> Thanks!`, 'success'));
      this.isNotRated = false;
      this.socket.send('#stop');
      this.shutDownConnection();
      switch (val) {
        case 'good':
          this.sendRateEv(5);
          break;
        case 'fine':
          this.sendRateEv(3);
          break;
        case 'bad':
          this.sendRateEv(2);
          break;
        default:
          break;
      }
    },
  },
};
