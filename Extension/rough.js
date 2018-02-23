
//var whois = require('whois-json');
// var sslCertificate = require('get-ssl-certificate');

function checkImageExists(imageUrl, callBack) {
	var imageData = new Image();
	imageData.onload = function() {
		callBack(true);
	};
	imageData.onerror = function() {
		callBack(false);
	};
	imageData.src = imageUrl;
}

function isShortUrl(url){
    var query = url.split('?');
    var fragment = url.split('/');
    if (url.length > 30) return false;    
    if (query[1] != undefined) return false;
    if (fragment[3] == undefined || fragment[3] == '' || fragment[5] != undefined) return false;
    if (fragment[2].length > 10) return false;   
    return true;
}
var TLDs = ["ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xn--0zwm56d", "xn--11b5bs3a9aj6g", "xn--3e0b707e", "xn--45brj9c", "xn--80akhbyknj4f", "xn--90a3ac", "xn--9t4b11yi5a", "xn--clchc0ea0b2g2a9gcd", "xn--deba0ad", "xn--fiqs8s", "xn--fiqz9s", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--g6w251d", "xn--gecrj9c", "xn--h2brj9c", "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--j6w193g", "xn--jxalpdlp", "xn--kgbechtv", "xn--kprw13d", "xn--kpry57d", "xn--lgbbat1ad8j", "xn--mgbaam7a8h", "xn--mgbayh7gpa", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgberp4a5d4ar", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1ai", "xn--pgbs0dh", "xn--s9brj9c", "xn--wgbh1c", "xn--wgbl6a", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zckzah", "xxx", "ye", "yt", "za", "zm", "zw"];
function getDomain(url){
    var parts = url.split('.');
    if (parts[0] === 'www'){
        parts.shift();
    }
    for(tld in TLDs){
		if(TLDs[tld]==parts[parts.length-1]){
			parts.splice(-1);
			break;
		}
	}
    return parts.length>2?1:parts.length==2?0:-1;
}
var getFavicon = function(){

    var favicon = undefined;
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++)
    {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
        {
            favicon = nodeList[i].getAttribute("href");
        }
    }
    if(favicon[0]=="/")    {
    	 url=location.href.split('/')[0]+'//'+location.href.split('/')[2]+favicon;
    }
    else    {
    	 url=favicon.replace(favicon.split('/')[0]+'//'+favicon.split('/')[2],location.href.split('/')[0]+'//'+location.href.split('/')[2]);
   }
   return url;
}
// function checkAbnormalURL(){
// 	whois(location.hostname, function(err, result){
// 		if(JSON.stringify(result.domainName, null, 2)) return -1;
// 		else return 1;
// 	});
// }
// function calcAge(){
// 	whois(location.hostname, function(err, result){
// 		var today = new Date();
// 		if(today.getFullYear()-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]>=1){
// 			return -1;
// 		}
// 		else if(today.getMonth()+1-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]>=6){
// 			return -1;
// 		}
// 		else return 1;
// 	});
// }
// function datediff(){
// 	sslCertificate.get(location.hostname).then(function (certificate) {
// 			D=new Date(certificate.valid_to);
// 			D1=new Date(certificate.valid_from);
// 			op=(D.getFullYear()-D1.getFullYear()>1)?-1:((D.getFullYear()-D1.getFullYear()==1)?((11-D.getMonth()+D1.getMonth())>=12?-1:1):1);
// 			return op;
// 	});
// }
// function registrationLength(){
// 	whois(location.hostname, function(err, result){
// 		if(JSON.stringify(result.registryExpiryDate, null, 2).replace('"','').split('-')[0]-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]<1){
// 			return 1;
// 		}
// 		else if(JSON.stringify(result.registryExpiryDate, null, 2).replace('"','').split('-')[0]-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[0]==1){
// 			if(JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]+1-JSON.stringify(result.creationDate, null, 2).replace('"','').split('-')[1]>1)
// 			return -1;
// 			else return 1;
// 		}
// 		else return 1;
// 	});
// }
having_IP_Address=window.location.hostname.match(/[a-z]/i)?1:-1;
URL_Length=location.hostname.length>75?1:location.hostname.length>=54?0:-1;
Shortining_Service=isShortUrl(window.location.href)?1:-1;
having_At_Symbol=window.location.hostname.match(/@/i)?1:-1;
double_slash_redirecting=location.href.lastIndexOf("//")>7?1:-1;
Prefix_Suffix=window.location.hostname.match(/-/i)?-1:1;
having_Sub_Domain=getDomain(window.location.hostname);
Favicon=getFavicon();
console.log(Favicon);
checkImageExists(Favicon, function(existsImage) {
if(existsImage == true) {
console.log("-1");
}
else {
console.log("1");
}
});
HTTPS_token=(window.location.hostname.search('https')!=-1)?-1:1;

// Abnormal_URL=checkAbnormalURL();
// age_of_domain=calcAge();
// SSLfinal_State=datediff();


// var alexa = require('alexarank');

// alexa("http://www.echojs.com/", function(error, result) {
//     if (!error) {
//         console.log("success");
//     } else {
//         console.log("error");
//     }
// });
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