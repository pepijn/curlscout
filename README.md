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

### Heroku

Recommended usage is running `curlscout` on **Heroku**, in combination with the **Loggly** addon. Step-by-step:

Create and cd into directory for project: `mkdir curlscout-example && cd curlscout-example`

Create the following files:

```javascript
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

var curlscout_server = require('curlscout')

curlscout_server.ip_whitelist = process.env.IP_WHITELIST.split(',')
curlscout_server.access_key   = process.env.ACCESS_KEY
curlscout_server.config_url   = process.env.CONFIG_URL

curlscout_server.listen(process.env.PORT)
```

Create first Git commit: `git init && git add . && git commit -am "Initial commit"`

Create Heroku app: `heroku create curlscout-example`

Push to Heroku: `git push heroku master`

Add Heroku configs:
```
heroku config:add CONFIG_URL=http://curlscout.s3-eu-west-1.amazonaws.com/curlscoutrc_example 
heroku config:add ACCESS_KEY=j8ZHXtCHjJBjN9HvqoXv 
heroku config:add IP_WHITELIST=127.0.0.1
```

And go! `curl -H "access-key: j8ZHXtCHjJBjN9HvqoXv" curlscout-example.herokuapp.com`

### NodePing


* https://github.com/pepijn/curlscout
* https://www.npmjs.org/package/curlscout
