'use strict'

const dns = require('dns')
const parse = require('spf-parse')
const _ = require('lodash')
const Bluebird = require('bluebird')

const testForSpf = (chunks) => /^v=spf1 /.test(chunks[0])
const getSpfData = (addresses) => {
  const spf = _.find(addresses, testForSpf).join('') // join array of record chunks that return
  return {
    spf,
    parsed: parse(spf)
  }
}

Bluebird.promisifyAll(dns)
module.exports = (hostname) => dns.resolveAsync(hostname, 'TXT').then(getSpfData)

// Uncomment below to test usage
// module.exports('uber.com').then((data) => {
//   console.log(JSON.stringify(data, null, 2))
// })
