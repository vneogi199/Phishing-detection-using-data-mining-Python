var google = require('google');
    google.resultsPerPage = 1;
    google(location.hostname, function (err, res){
        if (err) output.push(-1);
        var link = res.links[0];
        if(url.parse(link.href).hostname==input){ output.push(-1);}
        else {output.push(1);}
       	console.log(output); 
    });