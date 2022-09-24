const e = require('cors');
const fs = require('fs');
const path = require('path');
class UserController {
  constructor() {
    this._users = fs.readFileSync(`${__dirname}/../data/users.json`);

    this.getUserDetailByUsername = this.getUserDetailByUsername.bind(this);
  }
  
  async getUserDetailByUsername(req, res) {
    const { username } = req.params
    const { users } = JSON.parse(this._users);
    const user = users.find(user => user.username === username);
    if(!user) {
      res.status(404).send({
        status: 'fail',
        message: 'User tidak ditemukan',
       });
    } else {
      res.status(200).send({
        status: 'success',
        data: {
          user,
        }
       });
    }

  }
}

module.exports = UserController;