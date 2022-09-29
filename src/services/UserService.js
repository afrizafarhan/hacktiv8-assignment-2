const fs = require('fs');
const path = require('path')

class UserService {
  constructor() {
    this._users = fs.readFileSync(path.resolve(`${__dirname}/../data/users.json`));
  }
  getUserByUsername(username) {
    const { users } = JSON.parse(this._users);
    return users.find(user => user.username === username);
  }
}

module.exports = UserService;
