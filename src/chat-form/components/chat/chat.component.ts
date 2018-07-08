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
      };
    },
    created: function() {
      let initMessage = this.$route.query.initMessage;
      let socket = this.socket;
      socket.onopen = function() {
        socket.send(initMessage);
      };

      this.messages.push(new chatMessage(true, initMessage));
    },
  });
}
