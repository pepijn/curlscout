Curlscout
=========

![NodePing configuration](https://curlscout.s3-eu-west-1.amazonaws.com/curlscout.png)

A long time customer called me: "Why is my website redirecting to not-the-clients-website.com?" Oops, a low-traffic website  became the casualty of an (incorrectly) updated nginx configuration. Two days ago.

That afternoon, `curlscout` was born. In cooperation with her family of pre-existing tools, she is able to offer you:

* Easy configuration syntax for all kinds of redirects: `http{s,}`, `{www.,}example.{com,org,net}` etc.
* Quick setup and free hosting in region of your choice via Heroku
* International SMS/text alerts via NodePing
* Reponse time logging to AWS S3 for analysis via Loggly

## Dependencies

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

Recommended usage is running `curlscout` on **Heroku** with invocation/alerts via **NodePing**, and log persistence through the **Loggly** addon. Step-by-step:

### Heroku

Create and cd into directory for project: `mkdir curlscout-example && cd curlscout-example`

Create the following files:

```javascript
// package.json

{
  "dependencies": {
    "curlscout": ">= 0.9.1"
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

I recommmend NodePing for monitoring, because they send unlimited alerts via SMS/text. Pingdom and others can be used as well. Just make sure you are alerted when the response code is not `200`.

![NodePing configuration](https://curlscout.s3-eu-west-1.amazonaws.com/nodeping.png)

### Loggly

Add Loggly to Heroku: `heroku addons:add loggly`

When the addon is added, go to your Heroku app dashboard. Click the Loggly Mole and setup archiving to your S3 bucket.

![Loggly configuration](https://curlscout.s3-eu-west-1.amazonaws.com/loggly.png)

### Extras

The New Relic addon gives a nice overview of your total response times.

## References

* https://github.com/pepijn/curlscout
* https://www.npmjs.org/package/curlscout
