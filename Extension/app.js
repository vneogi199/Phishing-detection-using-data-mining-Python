var whois = require('whois-json');

whois('google.com', function(err, result){
	console.log(JSON.stringify(result, null, 2))
})