var input = `@relation phishing

@attribute having_IP_Address {-1,1}
@attribute URL_Length {1,0,-1}
@attribute Shortining_Service {1,-1}
@attribute having_At_Symbol {1,-1}
@attribute double_slash_redirecting {-1,1}
@attribute Prefix_Suffix {-1,1}
@attribute having_Sub_Domain {-1,0,1}
@attribute SSLfinal_State {-1,1,0}
@attribute Domain_registeration_length {-1,1}
@attribute Favicon {1,-1}
@attribute port {1,-1}
@attribute HTTPS_token {-1,1}
@attribute Request_URL {1,-1}
@attribute URL_of_Anchor {-1,0,1}
@attribute Links_in_tags {1,-1,0}
@attribute SFH {-1,1,0}
@attribute Submitting_to_email {-1,1}
@attribute Abnormal_URL {-1,1}
@attribute Redirect {0,1}
@attribute on_mouseover {1,-1}
@attribute RightClick {1,-1}
@attribute popUpWidnow {1,-1}
@attribute Iframe {1,-1}
@attribute age_of_domain {-1,1}
@attribute DNSRecord {-1,1}
@attribute web_traffic {-1,0,1}
@attribute Page_Rank {-1,1}
@attribute Google_Index {1,-1}
@attribute Statistical_report {-1,1}
@attribute Result {-1,1}

@data
IP1,Length2,1,1,1,1,1,1,1,1,1,1,-1,-1,0,-1,1,1,0,1,1,1,1,-1,1,1,1,1,1,-1    
`;

//1 having_IP_Address
input=window.location.hostname.match(/[a-z]/i)?input.replace("IP1","-1"):input.replace("IP1",1);
//2 URL_Length
URL_Length=location.hostname.length>75?input.replace("Length2","1"):location.hostname.length>=54?input.replace("Length2","0"):input.replace("Length2","-1");
function isShortUrl(url){
    var query = url.split('?');
    var fragment = url.split('/');
    if (url.length > 30) return false;    
    if (query[1] != undefined) return false;
    if (fragment[3] == undefined || fragment[3] == '' || fragment[5] != undefined) return false;
    if (fragment[2].length > 10) return false;   
    return true;
}

//var ips_list=["146.112.61.108","31.170.160.61","67.199.248.11","67.199.248.10","69.50.209.78","192.254.172.78","216.58.193.65","23.234.229.68","173.212.223.160","60.249.179.122"];
var domain_list=["esy.es","hol.es" ,"000webhostapp.com" ,"16mb.com" ,"bit.ly","for-our.info", "beget.tech" ,"blogspot.com","weebly.com","raymannag.ch" ];
var TLDs = ["ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "xn--0zwm56d", "xn--11b5bs3a9aj6g", "xn--3e0b707e", "xn--45brj9c", "xn--80akhbyknj4f", "xn--90a3ac", "xn--9t4b11yi5a", "xn--clchc0ea0b2g2a9gcd", "xn--deba0ad", "xn--fiqs8s", "xn--fiqz9s", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--g6w251d", "xn--gecrj9c", "xn--h2brj9c", "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--j6w193g", "xn--jxalpdlp", "xn--kgbechtv", "xn--kprw13d", "xn--kpry57d", "xn--lgbbat1ad8j", "xn--mgbaam7a8h", "xn--mgbayh7gpa", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgberp4a5d4ar", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1ai", "xn--pgbs0dh", "xn--s9brj9c", "xn--wgbh1c", "xn--wgbl6a", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zckzah", "xxx", "ye", "yt", "za", "zm", "zw"];
function getDomain(url,value){
    var parts = url.split('.');
    if (parts[0] === 'www'){
        parts.shift();
    }
    if(value==1)
        {
            for(tld in TLDs){
                if(TLDs[tld]==parts[parts.length-1]){
			    parts.splice(-1);
			    break;
		        }
            }
        return parts.length>2?1:parts.length==2?0:-1;
        }
    if(value==2)
        {
            for(domain in domain_list){             
                if(domain_list[domain]==parts[parts.length-2].concat(".",parts[parts.length-1]))
                    return 1;                
                } 
            return -1;
        }                   
}

function findWord(word) {
	Code=document.getElementsByTagName('html')[0].innerHTML;
	if (Code.indexOf(word) >=0) {
		return 1;
	}
    else 
 	return -1; 
}

function getSource(word)
{
    var nodeList = document.getElementsByTagName(word);
    var Code=[];
     for (var i = 0; i < nodeList.length; i++)
     {
          Code[i] = nodeList[i].getAttribute("src");
     }
     Code = Code.filter(function(n){ return n != undefined }); 
    return Code;
} 
function getURLs(word)
{
	var nodeList = document.getElementsByTagName(word);
    var Code=[];
     for (var i = 0; i < nodeList.length; i++)
     {
          Code[i] = nodeList[i].getAttribute("href");
     }
    Code = Code.filter(function(n){ return n != undefined }); 
   
    return Code;
           
} 



function getrequesturl()
{
	p=0;
	Image_URL=getSource("img");
	Video_URL=getSource("video");
	Audio_URL=getSource("audio");
	c=Image_URL.length+Video_URL.length+Audio_URL.length;
	for (i in Image_URL)
	{
		if (Image_URL[i].indexOf("http") >=0 || Image_URL[i].indexOf("https") >=0 ) 
			p=p+1;
	}
	for (i in Video_URL)
	{
		if (Video_URL[i].indexOf("http") >=0 || Video_URL[i].indexOf("https") >=0 ) 
			p=p+1;
	}
	for (i in Audio_URL)
	{
		if (Audio_URL[i].indexOf("http") >=0 || Audio_URL[i].indexOf("https") >=0 ) 
			p=p+1;
	} 
	return p/c<0.22?-1:p/c<0.61?0:1;
}

function getanchorurl()
{
	p=0;
	Anchor_URL=getURLs("a");

	c=Anchor_URL.length;
	for (a in Anchor_URL)
	{ 
		
		if(Anchor_URL[a].indexOf("#") >=0  || Anchor_URL[a].indexOf(":") >=0)
			p=p+1;
		else
		{	
			if (Anchor_URL[i].indexOf("http") >=0 || Anchor_URL[i].indexOf("https") >=0)
				p=p+1;
		}
	}

	return p/c<0.31?-1:p/c<0.67?0:1;
}
 
function getFavicon()
 {
 	 var favicon = undefined;
	 var nodeList = document.getElementsByTagName("link");
     for (var i = 0; i < nodeList.length; i++)
     {
        if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
        {
            favicon = nodeList[i].getAttribute("href");
        }}

     if (favicon.indexOf("http") >=0 || favicon.indexOf("https") >=0)
				return 1; 
			else return -1;
 }

function gettagurls()
{		
	p=0;
	var nodeList = document.getElementsByTagName("meta");
    var Meta_URL=[];
    for (var i = 0; i < nodeList.length; i++)
    {
         Meta_URL[i] = nodeList[i].getAttribute("content");
    }
    Meta_URL = Meta_URL.filter(function(n){ return n != undefined }); 	
	Link_URL=getURLs("link");
	Script_URL=getSource("script");
    c=Meta_URL.length+Link_URL.length+Script_URL.length;
    for (a in Link_URL)
	{ 		
		if(Link_URL[a].indexOf("#") >=0  || Link_URL[a].indexOf(":") >=0)
			p=p+1;		
	}
	for (a in Script_URL)
	{ 		
		if(Script_URL[a].indexOf("#") >=0  || Script_URL[a].indexOf(":") >=0)
			p=p+1;		
	}
	for (a in Meta_URL){
		last=0;
		while(last != -1){
    		last = Meta_URL[a].indexOf("http",last);    		
    		if(last != -1){
        		p=p+1;
        		last += "http".length();
    		}
    	}
	}
	return p/c<0.17?-1:p/c<0.81?0:1;	
}

//3
Shortining_Service=isShortUrl(window.location.href)?1:-1;
console.log(Shortining_Service);
//4
having_At_Symbol=window.location.hostname.match(/@/i)?1:-1;
//5
double_slash_redirecting=location.href.lastIndexOf("//")>7?1:-1;
//6
Prefix_Suffix=window.location.hostname.match(/-/i)?-1:1;
//7
having_Sub_Domain=getDomain(window.location.hostname,1);
//8
requesturl=getrequesturl();
//9
HTTPS_token=(window.location.hostname.search('https')!=-1)?-1:1;
//10
iframe=findWord("iframe");
//11
stat_report=getDomain(window.location.hostname,2);
//12
anchorurl=getanchorurl(); 
//13
favicon=getFavicon();
//14
tagurls=gettagurls();

