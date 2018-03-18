var portscanner = require('portscanner');
portscanner.checkPortStatus(3000, 'www.google.co.in', function(error, status) {
  // Status is 'open' if currently in use or 'closed' if available 
  console.log(status)
});