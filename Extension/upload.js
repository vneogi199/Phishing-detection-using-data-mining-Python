var Algorithmia = require('algorithmia');
// var client = Algorithmia.client("***REMOVED***");

// // Instantiate a DataDirectory object, set your data URI and call Create
// var testData = client.dir("data://vneogi199/testData")
// // Create your data collection if it does not exist
// testData.exists(function(exists) {
//     if (exists == false) {
//         testData.create(function(response) {
//             if (response.error) {
//                 return console.log("Failed to create dir: " + response.error.message);
//             }
//             console.log("Created directory: " + testData.data_path);
//         });
//     } else {
//         console.log("Your directory already exists.")
//     }
// });

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
1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,0,-1,1,1,0,1,1,1,1,-1,1,1,1,1,1,-1    
`;
Algorithmia.client("***REMOVED***")
.algo("vneogi199/testData")
.pipe(input)
.then(function(output) {
    console.log(output.result);
	var input1 = {
		"trainUrl":"data://vneogi199/training/Algorithmia-phishing.arff",
		// "testUrl":"data://.algo/vneogi199/WriteArff/temp/"+output.result.split('/')[output.result.split('/').length-1],
		"testUrl":output.result,
		"mode":"load",
		"modelUrl":"data://.algo/weka/WekaClassification/perm/model.txt"
	};
	console.log(input1);
	Algorithmia.client("***REMOVED***")
	    .algo("weka/RandomForest/0.1.1")
	    .pipe(input1)
	    .then(function(output) {
	        console.log(output);
    });
});