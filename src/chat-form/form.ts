declare const Vue: any;

const NotFound = { template: '<p>Page not found</p>' };
const Home = { template: '<p>home page</p>' };
const About = { template: '<p>about page</p>' };
const routes = {
  '/get-help/': Home,
  '/about': About,
};

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    currentRoute: window.location.pathname,
  },

  computed: {
    ViewComponent() {
      console.log(this.currentRoute);

      return routes[this.currentRoute] || NotFound;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
