const InvariantError = require('../exeptions/InvariantError');
const AuthValidator = {
  validateAuthLogin: ({ username, password }) => {
    if(!username || !password) {
      throw new InvariantError("Invalid request value");
    }
  },
  validateAuthRegister: ({ username, password, name }) => {
    if(!username || !password || !name) {
      throw new InvariantError("Invalid request value");
    }
  }
}

module.exports = AuthValidator;
