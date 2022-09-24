const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const TokenManager = require('../tokenize/TokenManager');

class AuthController {
  constructor() {
    this._usersData = fs.readFileSync(`${__dirname}/../data/users.json`);
    this._accessTokens = fs.readFileSync(`${__dirname}/../data/jwt.json`);

    this.login = this.login.bind(this);
  }
  async login(req, res) {
    const { username, password } = req.body
    const { users } = JSON.parse(this._usersData);
    const user = users.find(user => user.username === username);
    if(!user) {
      res.status(404).send({
        status: 'fail',
        message: 'User tidak ditemukan',
       });
    } else {
      const match = await bcrypt.compare(password, user.password);
      
      if (match) {
        const token = TokenManager.generateAccessToken(username);
        const accessToken = JSON.parse(this._accessTokens);
        accessToken.jwt.push(token);
        fs.writeFileSync(`${__dirname}/../data/jwt.json`, Buffer.from(JSON.stringify(accessToken)));
        res.status(200).send({
          status: 'success',
          data: {
            token,
          }
        });
     } else {
       res.status(400).send({
        status: 'fail',
        message: 'Username atau Password salah',
       });
     }
    }
  }
}

module.exports = AuthController;