const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env')});

const config = {
  server: {
    port: 3000,
  },
  jwt: {
    secretKey: process.env.ACCESS_TOKEN_KEY,
    expired: (60 * 60 * 1000),
  },
}

module.exports = config;