var should = require('chai').should();
var parser = require('../index');
var parseWhoIsData = parser.parseWhoIsData;

var whois = require('node-whois');

describe('Array',function(){
	describe('parseWhoIsData',function(){
		it('converts raw WhoIs string of into Array of JSON' , function(done){

			whois.lookup('github.com', function(err, data){
				if (err) throw err;

				console.log(data);

				console.log(parseWhoIsData(data));

				done();

			});

		});
	});
});
