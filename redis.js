const redis = require('redis')
const client = redis.createClient({
    host:'redis://red-cge4g6qk728lv80vepig',
    port:6379
  })
  module.exports =client;
