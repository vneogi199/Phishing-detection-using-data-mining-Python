var div = document.createElement("div");
div.setAttribute("id", "se-pre-con");
document.body.appendChild(div);
document.getElementById("se-pre-con").innerHTML = "<br><br><br><br><h1>Warning!!</h1><br><img src='http://pluspng.com/img-png/png-wrong-cross-clear-cross-empty-incorrect-red-wrong-icon-512.png'></img><br><p>This Page is suspected as Phishing Site.</p>";
var div2 = document.createElement("div");
div2.setAttribute("id", "del");
document.getElementById('se-pre-con').appendChild(div2);
document.getElementById("del").innerHTML = "<a>Click Here to Close the Message.</a>"
div2.onclick = function() {this.parentNode.removeChild(this);document.getElementById('se-pre-con').remove();
}
<<<<<<< HEAD
function datediff(){
	sslCertificate.get(location.hostname).then(function (certificate) {
			D=new Date(certificate.valid_to);
			D1=new Date(certificate.valid_from);
			op=(D.getFullYear()-D1.getFullYear()>1)?-1:((D.getFullYear()-D1.getFullYear()==1)?((11-D.getMonth()+D1.getMonth())>=12?-1:1):1);
			return op;
	});
}
function registrationLength(){
	whois(location.hostname, function(err, result){
		if(JSON.stringify(result.registryExpiryDate, null, 2).replace('"','').split('-')[0]-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]<1){
			return 1;
		}
		else if(JSON.stringify(result.registryExpiryDate, null, 2).replace('"','').split('-')[0]-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]==1){
			if(JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]+1-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]>1)
			return -1;
			else return 1;
		}
		else return 1;
	});
}
having_IP_Address=window.location.hostname.match(/[a-z]/i)?1:-1;
URL_Length=location.hostname.length>75?1:location.hostname.length>=54?0:-1;
Shortining_Service=isShortUrl(window.location.href)?1:-1;
having_At_Symbol=window.location.hostname.match(/@/i)?1:-1;
double_slash_redirecting=location.href.lastIndexOf("//")>7?1:-1;
Prefix_Suffix=window.location.hostname.match(/-/i)?-1:1;
having_Sub_Domain=getDomain(window.location.hostname);
Favicon=getFavicon();
HTTPS_token=(window.location.hostname.search('https')!=-1)?-1:1;
Abnormal_URL=checkAbnormalURL();
age_of_domain=calcAge();
SSLfinal_State=datediff();

var algorithmia = require("algorithmia");

var input = "vneogi199";
var client = algorithmia.client("***REMOVED***");

client.algo("algo://demo/Hello/")
       .pipe(input)
       .then(function(response) {
         console.log(response.get());
       });





// var div = document.createElement("div");
// div.setAttribute("id", "se-pre-con");
// document.body.appendChild(div);
// document.getElementById("se-pre-con").innerHTML = "<br><br><br><br><h1>Warning!!</h1><br><img src='http://pluspng.com/img-png/png-wrong-cross-clear-cross-empty-incorrect-red-wrong-icon-512.png'></img><br><p>This Page is suspected as Phishing Site.</p>";
// var div2 = document.createElement("div");
// div2.setAttribute("id", "del");
// document.getElementById('se-pre-con').appendChild(div2);
// document.getElementById("del").innerHTML = "<a>Click Here to Close the Message.</a>"
// div2.onclick = function() {this.parentNode.removeChild(this);document.getElementById('se-pre-con').remove();
// }
=======

>>>>>>> 394ab41923e67aed95258221690393e98ca4fea5
