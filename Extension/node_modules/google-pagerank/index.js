var request = require('request');

function jenkins(strurl) {
  var url = [];
  for (var i=0; i < strurl.length; i++) {
    url.push(strurl.charCodeAt(i));
  }

  var a, b, c;
  a = b = 0x9E3779B9;
  c = 0xE6359A60;

  var k = 0;
  var length = strurl.length;
  var len = length;

  while (len >= 12) {
    a = safeAdd(a, (url[k+0] | (url[k+1] << 8) | (url[k+2] << 16) | (url[k+3] << 24)));
    b = safeAdd(b, (url[k+4] | (url[k+5] << 8) | (url[k+6] << 16) | (url[k+7] << 24)));
    c = safeAdd(c, (url[k+8] | (url[k+9] << 8) | (url[k+10] << 16) | (url[k+11] << 24)));

    var ret = mix(a, b, c);
    a = ret[0];
    b = ret[1];
    c = ret[2];

    k += 12;
    len -= 12;
  }

  c += length;
  switch (len) {
    case 11:
      c += toUnsigned(url[k + 10] << 24);
    case 10:
      c += toUnsigned(url[k + 9] << 16);
    case 9:
      c += toUnsigned(url[k + 8] << 8);
    case 8:
      b += toUnsigned(url[k + 7] << 24);
    case 7:
      b += toUnsigned(url[k + 6] << 16);
    case 6:
      b += toUnsigned(url[k + 5] << 8);
    case 5:
      b += toUnsigned(url[k + 4]);
    case 4:
      a += toUnsigned(url[k + 3] << 24);
    case 3:
      a += toUnsigned(url[k + 2] << 16);
    case 2:
      a += toUnsigned(url[k + 1] << 8);
    case 1:
      a += toUnsigned(url[k + 0]);
      break;
    default:
      break;
  }
  a = toUnsigned(a);
  b = toUnsigned(b);
  c = toUnsigned(c);

  var ret = mix(a, b, c);
  a = ret[0];
  b = ret[1];
  c = ret[2];

  return c;
}

function mix(a, b, c) {
  a = safeSub(a, b); a = safeSub(a, c); a ^= (c >>> 13);
  b = safeSub(b, c); b = safeSub(b, a); b ^= toUnsigned(a << 8);
  c = safeSub(c, a); c = safeSub(c, b); c ^= (b >>> 13);
  a = safeSub(a, b); a = safeSub(a, c); a ^= (c >>> 12);
  b = safeSub(b, c); b = safeSub(b, a); b ^= toUnsigned(a << 16);
  c = safeSub(c, a); c = safeSub(c, b); c ^= (b >>> 5);
  a = safeSub(a, b); a = safeSub(a, c); a ^= (c >>> 3);
  b = safeSub(b, c); b = safeSub(b, a); b ^= toUnsigned(a << 10);
  c = safeSub(c, a); c = safeSub(c, b); c ^= (b >>> 15);
  return [toUnsigned(a), toUnsigned(b), toUnsigned(c)];
}

function safeSub(x, y) {
  return toUnsigned(x - y);
}

function safeAdd(x, y) {
  return toUnsigned(x + y);
}

function toUnsigned(x) {
  return x >>> 0;
}

function getPageRank(url, callback) {
  var q = 'info:' + url;
  var ch = jenkins(q);
  q = encodeURIComponent(q);
  ch = encodeURIComponent(ch);

var HOST = '';
  var opts = {
    url: 'http://toolbarqueries.google.com/tbr?client=navclient-auto&ch=6' +
      ch + '&ie=UTF-8&oe=UTF-8&features=Rank&q=' + q,
    headers: {
      'User-Agent': "Mozilla/4.0 (compatible; GoogleToolbar 2.0.111-big; Windows XP 5.1)",
    },
  };
  request(opts, function(err, resp, body) {
    callback(err, parseInt(body.slice(body.lastIndexOf(':') + 1).trim()));
  });
}

function main() {
  getPageRank(process.argv[2], function(err, rank) {
    if (err) {
      console.error(err);
    } else {
      console.log(rank);
    }
  });
}

if (require.main === module) {
  main();
}

module.exports = exports = getPageRank;
