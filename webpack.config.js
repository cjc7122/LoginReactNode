// webpack.config.js

const path = require('path');

module.exports = {
  // Other webpack configurations...
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "timers": require.resolve("timers-browserify"),
      "fs": false, // You may not need a polyfill for fs in a browser environment
      "net": false, // You may not need a polyfill for net in a browser environment
      "tls": false, // You may not need a polyfill for tls in a browser environment
      "dns": false, // You may not need a polyfill for dns in a browser environment
      "process": false, // You may not need a polyfill for process in a browser environment
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"), // Trailing slash is necessary for url module
    }
  }
};
