const test = require('tape')
const scamvoidStats = require('../')

test('scamVoidStats', async t => {
  t.plan(24)

  // safe
  let domain = 'github.com'

  let data = await scamvoidStats(domain)
  console.log(JSON.stringify(data, null, 2))
  t.equal(data.domain, domain)
  t.ok(data.verdict)
  t.ok(data.wot)
  t.ok(data.blacklist)
  t.ok(data.popularity)
  t.ok(data.creation)
  t.ok(data.https)
  t.ok(data.hostingProvider)

  // warning
  domain = 'foo.com'

  data = await scamvoidStats(domain)
  console.log(JSON.stringify(data, null, 2))
  t.equal(data.domain, domain)
  t.ok(data.verdict)
  t.ok(data.wot)
  t.ok(data.blacklist)
  t.ok(data.popularity)
  t.ok(data.creation)
  t.ok(data.https)
  t.ok(data.hostingProvider)

  // unsafe
  domain = 'adchain.com'

  data = await scamvoidStats(domain)
  console.log(JSON.stringify(data, null, 2))
  t.equal(data.domain, domain)
  t.ok(data.verdict)
  t.ok(data.wot)
  t.ok(data.blacklist)
  t.ok(data.popularity)
  t.ok(data.creation)
  t.ok(data.https)
  t.ok(data.hostingProvider)
})
