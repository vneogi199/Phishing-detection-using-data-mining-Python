module.exports = {
	/*
	 *	@param {String} Who Is string
	 *  @return {Array} Array of JSON objects
	*/


	parseWhoIsData: function(data) {
		var attr;
		var attrColon;
		var tempStr='';
		var returnArray = [];

		data.split('\n').forEach(function(part){
			if(!part) return;

		  attrColon = part.indexOf(': ');
			attr = part.substr(0, attrColon);

			if(attr !== ''){
				returnArray.push({
					attribute: attr,
					value: part.substr(attrColon+1).trim()
				});
			}
			else{
				tempStr += part.substr(attrColon+1).trim() + '\n';
			}
		});

		returnArray.push({
			attribute: 'End Text',
			value: tempStr
		});

		return returnArray;
	}

};