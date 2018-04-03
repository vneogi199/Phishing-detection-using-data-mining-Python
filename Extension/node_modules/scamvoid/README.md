# scamvoid

> Scrapes [Scamvoid](https://www.scamvoid.com) site to get safety report for domain.

## Install

```bash
npm install scamvoid
```

## Usage

```node.js
const scamvoidReport = require('scamvoid')

const domain = 'github.com'

scamvoidReport(domain)
.then(data => {
  console.log(data)

/*
{
  "domain": "github.com",
  "verdict": {
    "flag": "safe",
    "key": "Final Verdict",
    "value": "Potentially Safe",
    "report": [
      {
        "key": "Website",
        "value": "Github.com",
        "flag": ""
      },
      {
        "key": "WOT Trustworthiness",
        "value": "Excellent (94/100)",
        "flag": "safe"
      },
      {
        "key": "Domain Blacklist Status",
        "value": "Not Blacklisted (0/8)",
        "flag": "safe"
      },
      {
        "key": "Website Popularity",
        "value": "Good Traffic Volume (#58)",
        "flag": "safe"
      },
      {
        "key": "Domain Creation Date",
        "value": "10 Years Ago (2007-10-09)",
        "flag": "safe"
      },
      {
        "key": "HTTPS Connection",
        "value": "Valid HTTPS Found",
        "flag": "safe"
      },
      {
        "key": "Domain WHOIS Data",
        "value": "Find Who Owns the Domain",
        "flag": "",
        "link": "http://www.ipvoid.com/whois/"
      },
      {
        "key": "Sponsored Tool",
        "value": "Convert PDF Files Online »",
        "flag": "",
        "link": "http://www.pdfconverto.com/"
      },
      {
        "key": "Suggested Checks",
        "value": "How to Avoid Online Scams",
        "flag": "",
        "link": "#suggestions"
      },
      {
        "key": "User Comments",
        "value": "Read Comments",
        "flag": "",
        "link": "#comments"
      }
    ]
  },
  "wot": {
    "flag": "safe",
    "key": "WOT Trustworthiness",
    "value": "The site trustworthiness rating is excellent (94/100)."
  },
  "blacklist": {
    "flag": "safe",
    "key": "Domain Blacklist Status",
    "value": "The site is not detected by any blacklist engine",
    "report": [
      {
        "key": "GoogleSafeBrowsing",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.google.com/safebrowsing/diagnostic?site=github.com"
      },
      {
        "key": "MalwareDomainList",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.malwaredomainlist.com/mdl.php?search=github.com"
      },
      {
        "key": "Spam404",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.spam404.com/apps/search?q=github.com"
      },
      {
        "key": "SpamhausDBL",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.spamhaus.org/query/domain/github.com"
      },
      {
        "key": "SURBL",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.surbl.org/surbl-analysis"
      },
      {
        "key": "ThreatLog",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.threatlog.com/domain/github.com/"
      },
      {
        "key": "URLVir",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://www.urlvir.com/search-host/github.com/"
      },
      {
        "key": "VXVault",
        "value": "Not Detected",
        "flag": "safe",
        "link": "http://vxvault.net/ViriList.php"
      }
    ]
  },
  "popularity": {
    "flag": "safe",
    "key": "Website Popularity",
    "value": "The site is ranked #58 on millions of other sites"
  },
  "domain": {
    "flag": "safe",
    "key": "Domain Creation Date",
    "value": "The domain name was created 10 years ago."
  },
  "https": {
    "flag": "safe",
    "key": "HTTPS Connection",
    "value": "The website uses a valid HTTPS connection."
  },
  "hostingProvider": {
    "flag": "",
    "key": "Hosting Provider",
    "value": "",
    "report": [
      {
        "key": "IP Address",
        "value": "192.30.253.112"
      },
      {
        "key": "Reverse DNS",
        "value": "lb-192-30-253-112-iad.github.com"
      },
      {
        "key": "Hosting Provider",
        "value": "AS36459 GitHub, Inc."
      },
      {
        "key": "Location",
        "value": "(US) United States"
      },
      {
        "key": "Continent",
        "value": "North America"
      }
    ]
  }
}
*/
})
.catch(error => {
  console.error(error)
})
```

## Test

```bash
npm test
```

NOTE: This module will most likely break in the future when Scamvoid updates their DOM selectors.

## License

MIT
