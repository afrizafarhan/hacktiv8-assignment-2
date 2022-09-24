const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const TokenManager = {
  generateAccessToken: (username) => {
    return jwt.sign({ data: username }, config.jwt.secretKey, {
        expiresIn: config.jwt.expired,
      }
    )
  },
  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, config.jwt.secretKey);
    } catch (e) {
      console.error(e.message);
      return undefined;
    }
  } 
}

module.exports = TokenManager;