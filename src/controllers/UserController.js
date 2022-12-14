const e = require('cors');
const fs = require('fs');
const path = require('path');
const ClientError = require('../exeptions/ClientError');
const NotFoundError = require('../exeptions/NotFoundError');
const UserService = require('../services/UserService');
class UserController {
  constructor() {
    this._users = fs.readFileSync(path.resolve(`${__dirname}/../data/users.json`));
    this._userService = new UserService();
    this.getUserDetailById = this.getUserDetailById.bind(this);
  }
  
  async getUserDetailById(req, res) {
    try {
      const { id } = req.params
      const user = this._userService.getUserById(id);
      if(!user) {
        throw new NotFoundError(`User dengan ${id} tidak ditemukan`);
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