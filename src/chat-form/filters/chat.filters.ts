declare const Vue: any;

Vue.filter('toMinutes', function(value) {
  let num: any = Math.floor(value / 1000 / 60 % 60);
  if (num < 10) num = `0${num}`;
  return num;
});

Vue.filter('toSeconds', function(value) {
  let num: any = Math.floor(value / 1000 % 60);
  if (num < 10) num = `0${num}`;
  return num;
});
