declare const Vue: any;
import template from './chat.view';
import chatMessage from '../../../common/ts/classes';
import * as wsService from '../../../services/websocket.service';

export default function chatComponent() {
  return Vue.extend({
    template: template(),
    data: function() {
      return {
        messages: [],
        socket: new WebSocket(wsService.getHost()),
        interval: '',
        countdown: 15 * 60 * 1000, // in milliseconds
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
    },
    methods: {
      startCountDown: function() {
        this.interval = setInterval(this.updateTimer, 1000);
      },
      stopInterval: function() {
        clearInterval(this.interval);
      },
      updateTimer: function() {
        this.countdown -= 1000;
      },
      keepSocketAwake: function() {
        this.socket.send('');
      },
    },
  });
}
