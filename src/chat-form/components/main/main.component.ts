declare const Vue: any;
import template from './main.view';

export default function mainComponent() {
  return Vue.extend({
    template: template(),
    data: function() {
      return {
        title: `Welcome to merit support!`,
      };
    },
  });
}
