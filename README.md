# SPF parsing demo

Messing around with how to parse SPF data (someone good at recursion needs to figure out how to traverse the includes, etc)

Example usage:

```js
const resolve = require('./index')

resolve('uber.com').then((data) => {
  console.log(JSON.stringify(data, null, 2))
})
```

would return

```JSON
{
  "spf": "v=spf1 include:uber.com._nspf.vali.email include:%{i}._ip.%{h}._ehlo.%{d}._spf.vali.email ~all",
  "parsed": {
    "mechanisms": [
      {
        "prefix": "v",
        "type": "version",
        "description": "The SPF record version",
        "value": "spf1"
      },
      {
        "prefix": "+",
        "prefixdesc": "Pass",
        "type": "include",
        "description": "The specified domain is searched for an 'allow'",
        "value": "uber.com._nspf.vali.email"
      },
      {
        "prefix": "+",
        "prefixdesc": "Pass",
        "type": "include",
        "description": "The specified domain is searched for an 'allow'",
        "value": "%{i}._ip.%{h}._ehlo.%{d}._spf.vali.email"
      },
      {
        "prefix": "~",
        "prefixdesc": "SoftFail",
        "type": "all",
        "description": "Always matches. It goes at the end of your record"
      }
    ],
    "valid": true
  }
}
```
