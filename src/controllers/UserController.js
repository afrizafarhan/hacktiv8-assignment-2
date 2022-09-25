const e = require('cors');
const fs = require('fs');
const path = require('path');
const ClientError = require('../exeptions/ClientError');
const NotFoundError = require('../exeptions/NotFoundError');
class UserController {
  constructor() {
    this._users = fs.readFileSync(path.resolve(`${__dirname}/../data/users.json`));

    this.getUserDetailByUsername = this.getUserDetailByUsername.bind(this);
  }
  
  async getUserDetailByUsername(req, res) {
    try {
      const { username } = req.params
      const { users } = JSON.parse(this._users);
      const user = users.find(user => user.username === username);
      if(!user) {
        throw new NotFoundError(`User dengan ${username} tidak ditemukan`);
      } 
      res.status(200).send({
        status: 'success',
        data: {
          user: {
            username: user.username,
            name: user.name,
          },
        }
      });
    } catch (error) {
      if (error instanceof ClientError) {
        res.status(error.statusCode).send({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      res.status(500).send({
        status: 'fail',
        message: 'Terjadi kesalahan pada server',
      });
    }
  }
}

module.exports = UserController;