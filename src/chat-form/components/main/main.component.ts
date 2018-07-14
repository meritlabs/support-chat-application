declare const Vue: any;
const template = require('./main.view.html');

export default {
  template: template.default,
  data: function() {
    return {
      title: `Welcome to merit support!`,
      description: `Ask community using our support application, enter your message below:`,
      initMessage: '',
      isMessageValid: true,
    };
  },
  created: function() {
    let restartMessage = this.$route.query.restartMessage;
    if (restartMessage) {
      this.initMessage = restartMessage;
      this.$router.replace('/'); // remove query params
    }
  },
  methods: {
    sendRequest: function(message) {
      if (message.length > 2) {
        this.$router.push({ path: '/chat', query: { initMessage: message } });
      } else {
        this.isMessageValid = false;
      }
    },
  },
};
