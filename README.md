Curlscout
=========

![NodePing configuration](https://curlscout.s3-eu-west-1.amazonaws.com/curlscout.png)

[![NPM Version](https://badge.fury.io/js/curlscout.svg)](https://badge.fury.io/js/curlscout)


A long time customer called me: "Why is my website redirecting to not-the-clients-website.com?" Oops, a low-traffic website  became the casualty of an (incorrectly) updated nginx configuration. Two days before.

That afternoon, `curlscout` was born. In cooperation with her family of pre-existing tools, she is able to offer you:

* Easy configuration syntax for all kinds of redirects: `http{s,}`, `{www.,}example.{com,org,net}` etc.
* Quick setup and free hosting in region of your choice via Heroku
* International SMS/text alerts via NodePing
* Logging to AWS S3 for response-time analysis of all your websites via Loggly
* Less time spent checking all of your websites :-)

## Dependencies

Required:
* `curl`: http://curl.haxx.se/

Optional:
* node.js: http://nodejs.org/
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

The process exits with `0` if the configuration expectations match with the responses. Exit `1` if there is a mismatch.

### Configuration

The configuration file is separated by groups. Groups are logged, so they are useful for uptime reports. A group has one or more lines beneath. These lines declare the expected HTTP response. The following three columns are used:

1. Expected HTTP response code
2. Host (parsed by curl, so stuff like HTTP auth and lists (`http{s,}`, `{www.,}example.org`) is possible too)
3. Optional: expected HTTP Location header for `30[12]` redirects

Example:

```
github
301 github.com             https://github.com/
301 www.github.com         https://www.github.com/
301 https://www.github.com https://github.com/
200 https://github.com

reddit
302 reddit.com http://www.reddit.com/
200 www.reddit.com
```

## Integration example

Recommended usage is running `curlscout` on **Heroku** with invocation/alerts via **NodePing**, and log persistence through the **Loggly** addon. All steps are optional. Hosting (app and/or configuration file) on your own server is possible too. Step-by-step:

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

Take a look at your Heroku logs: `heroku logs --tail`

![Heroku Logs](https://curlscout.s3-eu-west-1.amazonaws.com/heroku_logs.png)

### NodePing

I recommmend NodePing for monitoring, because they send unlimited alerts via SMS/text. Pingdom and others can be used as well. Just make sure you are alerted when the response code is not `200`.

![NodePing configuration](https://curlscout.s3-eu-west-1.amazonaws.com/nodeping.png)

### Loggly

Add Loggly to Heroku: `heroku addons:add loggly`

When the addon is added, go to your Heroku app dashboard. Click the Loggly Mole and setup archiving to your S3 bucket.

![Loggly configuration](https://curlscout.s3-eu-west-1.amazonaws.com/loggly.png)

### Extras

The New Relic addon gives a nice overview of your total response time.

## References

* https://github.com/pepijn/curlscout
* https://www.npmjs.org/package/curlscout
