const redis = require("redis");
const { promisify } = require("util");

// Connecting to redis
const client = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

client.on("error", function (error) {
  console.error(error);
});

// Promisifying Get and set methods
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

module.exports = {
  client,
  GET_ASYNC,
  SET_ASYNC,
};
