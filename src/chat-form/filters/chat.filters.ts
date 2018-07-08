declare const Vue: any;

Vue.filter('toMinutes', function(value) {
  return Math.floor(value / 1000 / 60 % 60);
});

Vue.filter('toSeconds', function(value) {
  return Math.floor(value / 1000 % 60);
});
