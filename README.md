Curlscout
=========

A long time customer called me: "Why is my website redirecting to not-the-clients-website.com?" Oops, a low-traffic website  became the casualty of an (incorrectly) updated nginx configuration. Two days ago.

That afternoon, `curlscout` was born. A small and therefore excellent family member in a world of wonderful tools:

Required:
* `curl`: http://curl.haxx.se/

Optional:
* `node.js`: http://nodejs.org/
* Heroku: https://heroku.com
* Loggly: https://www.loggly.com/
* NodePing: https://nodeping.com/
* AWS (Amazon) S3: https://aws.amazon.com/s3/

## Usage

### Installation

`npm install -g curlscout`

### Invocation

The configuration file can both be piped (2) and loaded by `curl` (1).

1: `curlscout https://raw.githubusercontent.com/pepijn/curlscout/master/curlscoutrc_example`

2: `cat curlscoutrc_example | curlscout`

## Integration

Recommended usage is running `curlscout` on **Heroku**, in combination with the **Loggly** addon. Step-by-step:

Create and cd into directory for project: `mkdir curlscout-example && cd curlscout-example`

Create Heroku app: `heroku create curlscout-example`

Create the following files:

```json
// package.json

{
  "dependencies": {
    "curlscout": ">= 0.9.0"
  }
}
```

```javascript
// server.js

"use strict"

require('newrelic')

var curlscout_server = require('curlscout')

curlscout_server.ip_whitelist = process.env.ip_whitelist.split(',')
curlscout_server.access_key   = process.env.access_key
curlscout_server.config_url   = process.env.config_url

curlscout_server.listen(process.env.port)
```

* https://github.com/pepijn/curlscout
* https://www.npmjs.org/package/curlscout
