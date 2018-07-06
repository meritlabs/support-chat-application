declare const Vue: any;
import template from './chat.view';

export default function chatComponent() {
  return Vue.extend({
    template: template(),
    data: function() {
      return {};
    },
    methods: {
      sendRequest: function(message) {
        if (message.length > 2) {
          this.$router.push({ path: '/chat', params: { initMessage: message } });
        } else {
          this.isMessageValid = false;
        }
      },
    },
  });
}
