const path = require('path');

module.exports = {
  // Your existing webpack configuration goes here

  resolve: {
    fallback: {
      "fs": false,
      "path": require.resolve("path-browserify")
    }
  }
}