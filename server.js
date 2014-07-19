"use strict"

var http  = require('http'),
    util  = require('util'),
    spawn = require('child_process').spawn

var server = http.createServer(function(req, res) {
  var ip_list  = this.ip_whitelist,
      remoteip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      ip_whitelisted  = ip_list.indexOf(remoteip) >= 0,
      api_key_correct = req.headers['api-key'] == this.access_key

  if (!api_key_correct && !ip_whitelisted) {
    res.statusCode = 403
    return res.end()
  }

  var ps = spawn('curlscout', [this.config_url])
  var output = "";

  ps.stdout.on('data', function(data) {
    var data = data.toString()
    util.puts(data.trim())
    output += data
  })
  ps.stderr.on('data', function(data) {
    var data = data.toString()
    util.error(data.toString().trim())
    output += data
  })
  ps.on('exit', function(code) {
    if (code > 0) res.statusCode = 500
    res.write(output)
    res.end()
  })
})

module.exports = server
