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
      };
    },
    methods: {
      sendRequest: function(message) {
        this.$router.push({ path: '/chat', params: { initMessage: message } });
      },
    },
  });
}
