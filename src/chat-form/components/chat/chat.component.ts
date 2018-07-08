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
        _this.messages.push(new chatMessage(true, '', 'countdown'));
        _this.startCountDown();
      };
    },
    methods: {
      startCountDown: function() {
        setInterval(this.updateTimer, 1000);
      },
      updateTimer: function() {
        this.countdown -= 1000;
      },
    },
  });
}
