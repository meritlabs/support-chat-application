declare const Vue: any;
import template from './main.view';

export default function mainComponent() {
  return Vue.extend({
    template: template(),
    data: function() {
      return {
        title: `Welcome to merit support!`,
        description: `Ask community using our support application, enter your message below:`,
        initMessage: '',
        isMessageValid: true,
      };
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
