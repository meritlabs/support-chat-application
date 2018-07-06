declare const Vue: any;
import template from './chat.view';
import chatMessage from '../../../common/ts/classes';

export default function chatComponent() {
  return Vue.extend({
    template: template(),
    data: function() {
      return {
        messages: [],
      };
    },
    created: function() {
      this.messages.push(new chatMessage('current', this.$route.query.initMessage));
    },
    methods: {},
  });
}
