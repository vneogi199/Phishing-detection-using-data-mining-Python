const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

function scamvoidReport (domain) {
  return new Promise((resolve, reject) => {
    const headers = {
      Host: 'www.scamvoid.com',
      Referer: `https://www.scamvoid.com/check/${domain}`,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      Pragma: 'no-cache',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.8,es;q=0.6'
    }

    // for GET
    // const uri = `https://www.scamvoid.com/check/${domain}`

    // for POST
    const uri = 'https://www.scamvoid.com/'

    const options = {
      method: 'POST',
      uri,
      form: {
        site: domain
      },
      followRedirect: true,
      followAllRedirects: true,
      headers
    }

    request(options, (error, response, body) => {
      if (error) {
        return reject(error)
      }

      const data = {
        domain: domain,
        verdict: {
          flag: '',
          key: '',
          value: '',
          report: [],
        },
        wot: {
          flag: '',
          key: '',
          value: '',
          link: ''
        },
        blacklist: {
          flag: '',
          key: '',
          value: '',
          report: [],
        },
        popularity: {
          flag: '',
          key: '',
          value: ''
        },
        creation: {
          flag: '',
          key: '',
          value: ''
        },
        https: {
          flag: '',
          key: '',
          value: ''
        },
        hostingProvider: {
          flag: '',
          key: '',
          value: '',
          report: []
        }
      }

      if (!body) {
        return resolve(data)
      }

      const $ = cheerio.load(body)

      let key = $('body > section > div > div.panel.m-t-3')
      let value = $('body > section > div > div.panel.m-t-3 > div.panel-body > h2')
      let flag = getFlag(key)
      key = key.find('> div.panel-heading').text().trim()
      value = value.text().trim()

      data.verdict.key = key
      data.verdict.value = value
      data.verdict.flag = flag

      let tableRows = $('body > section > div > div.panel.m-t-3 > div.panel-body > div > table > tbody > tr')

      tableRows.each((i, x) => {
        const key = $(x).find('td:nth-child(1)').text().trim()
        let value = $(x).find('td:nth-child(2)')
        const flag = getFlag(value.find('> font'))
        const link = value.find('a').attr('href')
        value = value.text().trim()

        data.verdict.report.push({
          key,
          value,
          flag,
          link
        })
      })

      key = $('body > section > div > div:nth-child(7) > div > h3').text().trim()
      value = $('body > section > div > div:nth-child(7) > div > p.font-bold')
      flag = getFlag(value)
      value = value.text().trim()

      if (/wot/gi.test(key)) {
        data.wot.key = key
        data.wot.value = value
        data.wot.flag = flag
        data.wot.link = `https://www.mywot.com/en/scorecard/${domain}`
      }

      key = $('body > section > div > div:nth-child(8) > div > h3').text().trim()
      value = $('body > section > div > div:nth-child(8) > div > p.font-bold')
      flag = getFlag(value)
      value = value.text().trim()

      if (/blacklist/gi.test(key)) {
        data.blacklist.key = key
        data.blacklist.value = value
        data.blacklist.flag = flag
      }

      tableRows = $('body > section > div > div:nth-child(8) > div > div > table > tbody > tr')

      tableRows.each((i, x) => {
        let key = $(x).find('td:nth-child(1)')
        let value = $(x).find('td:nth-child(2) span')
        let link = $(x).find('td:nth-child(3) a').attr('href')
        const flag = getFlag(value)
        const image = key.find('img').attr('src')

        key = key.text().trim()
        value = value.text().trim()


        data.blacklist.report.push({
          key,
          value,
          flag,
          link,
          image
        })
      })

      key = $('body > section > div > div:nth-child(10) > div > h3').text().trim()
      value = $('body > section > div > div:nth-child(10) > div > p.font-bold')
      flag = getFlag(value)
      value = value.text().trim()

      if (/popularity/gi.test(key)) {
        data.popularity.key = key
        data.popularity.value = value
        data.popularity.flag = flag
      }

      key = $('body > section > div > div:nth-child(11) > div > h3').text().trim()
      value = $('body > section > div > div:nth-child(11) > div > p.font-bold')
      flag = getFlag(value)
      value = value.text().trim()

      if (/creation/gi.test(key)) {
        data.creation.key = key
        data.creation.value = value
        data.creation.flag = flag
      }

      key = $('body > section > div > div:nth-child(13) > div > h3').text().trim()
      value = $('body > section > div > div:nth-child(13) > div > p.font-bold')
      flag = getFlag(value)
      value = value.text().trim()

      if (/https/gi.test(key)) {
        data.https.key = key
        data.https.value = value
        data.https.flag = flag
      }

      key = $('body > section > div > div:nth-child(14) > div > h3').text().trim()

      if (/hosting/gi.test(key)) {
        data.hostingProvider.key = key
      }

      tableRows = $('body > section > div > div:nth-child(14) > div > div > table > tbody > tr')

      tableRows.each((i, x) => {
        const key = $(x).find('td:nth-child(1)').text().trim()
        let value = $(x).find('td:nth-child(2)')
        value = value.text().trim()

        data.hostingProvider.report.push({
          key,
          value
        })
      })

      resolve(data)
    })
  })
}

function getFlag(el) {
  let flag = ''

  if (!(el instanceof Object)) {
    return flag
  }

  if (el.hasClass('text-success') || el.hasClass('label-success') || el.hasClass('panel-success')) {
    flag = 'safe'
  } else if (el.hasClass('text-danger') || el.hasClass('label-danger') || el.hasClass('panel-danger')) {
    flag = 'unsafe'
  } else if (el.hasClass('text-warning') || el.hasClass('label-warning') || el.hasClass('panel-warning')) {
    flag = 'warning'
  } else if (el.hasClass('text-default') || el.hasClass('label-default') || el.hasClass('panel-default')) {
    flag = 'unknown'
  }

  return flag
}

module.exports = scamvoidReport
