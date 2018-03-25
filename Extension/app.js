var alexa = require('alexarank');

alexa(location.hostname, function(error, result) {
    if (!error) {
        console.log(result);
    } else {
        console.log(error);
    }
});