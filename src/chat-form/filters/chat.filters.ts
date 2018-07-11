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

Vue.filter('getTime', function(value) {
  let hours = value.getHours();
  let minutes = value.getMinutes();
  let seconds = value.getSeconds();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
});
