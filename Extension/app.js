var sslCertficate = require('get-ssl-certificate');
sslCertficate.get(window.location.hostname).then(function (certificate) {
  console.log(certificate);
  // certificate is a JavaScript object
 
  console.log(certificate.issuer);
  // { C: 'GB',
  //   ST: 'Greater Manchester',
  //   L: 'Salford',
  //   O: 'COMODO CA Limited',
  //   CN: 'COMODO RSA Domain Validation Secure Server CA' }
 
  console.log(certificate.valid_from)
  // 'Nov  8 00:00:00 2015 GMT'
 
  console.log(certificate.valid_to)
  // 'Aug 22 23:59:59 2017 GMT'
});