// const redis = require('redis')
// const client = redis.createClient({
//     host:'redis://red-cge4g6qk728lv80vepig',
//     port:6379
//   })





import { createClient } from 'redis';

(async () => {
  // Connect to your internal Redis instance using the REDIS_URL environment variable
  // The REDIS_URL is set to the internal Redis URL e.g. redis://red-343245ndffg023:6379
  const client = createClient({
      url: redis://red-cge4g6qk728lv80vepig:6379
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();

  // Send and retrieve some values
//   await client.set('key', 'node redis');
//   const value = await client.get('key');

  console.log("found value: ", value)
})();
  module.exports =client;
