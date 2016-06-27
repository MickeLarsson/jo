import fetch from 'fetch';

try {
    var gpio = require('onoff').Gpio;
} catch (e) {
    var gpio = function(){
        return {
            watch: function(){},
            unexport: () => {}
        };
    }
}

const buttonYellow = new gpio(4, 'in', 'falling', { debounceTimeout: 800 });
const buttonGreen = new gpio(25, 'in', 'falling', { debounceTimeout: 800 });

const baseUrl = 'http://clown.miklar.se:3000'

buttonGreen.watch(function(err, val){
    console.log('green pressed');
    if (err) {
        console.log(err);
        exit();
    }

    fetch.fetchUrl(baseUrl + '/green', () => { console.log('The green one did it.');});
});

buttonYellow.watch(function(err, val){
    console.log('yellow pressed');
    if (err) {
        console.log(err);
        exit();
    }

    fetch.fetchUrl(baseUrl + '/yellow', () => { console.log('The yellow one did it.');});
});

process.on('SIGINT', function () {
  buttonGreen.unexport();
  buttonYellow.unexport();
  process.exit();
});

function wait () {
  console.log('waiting');
  setTimeout(wait, 1000);
};
wait();

console.log('lets go');

