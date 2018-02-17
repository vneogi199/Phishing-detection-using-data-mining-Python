var whois = require('whois-json');

// whois('google.com', function(err, result){
// 	console.log(JSON.stringify(result, null, 2))
// })
function registrationLength(){
	whois('google.com', function(err, result){
		if(JSON.stringify(result.registryExpiryDate, null, 2).replace('"','').split('-')[0]-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]<1){
			console.log(1);
			//return 1;
		}
		else if(JSON.stringify(result.registryExpiryDate, null, 2).replace('"','').split('-')[0]-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]==1){
			if(JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]+1-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]>1)
			console.log(-1);
			// return -1;
			else console.log(1);
			// else return 1;
		}
		else console.log(1);
		// else return 1;
	}).then(console.log(registrationLength()););
}
