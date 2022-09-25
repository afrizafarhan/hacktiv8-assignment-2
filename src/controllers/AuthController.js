const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const TokenManager = require('../tokenize/TokenManager');
const AuthValidator = require('../validator/AuthValidator');
const NotFoundError = require('../exeptions/NotFoundError');
const InvariantError = require('../exeptions/InvariantError');
const ClientError = require('../exeptions/ClientError');

class AuthController {
  constructor() {
    this._usersData = fs.readFileSync(path.resolve(`${__dirname}/../data/users.json`));
    this._accessTokens = fs.readFileSync(path.resolve(`${__dirname}/../data/jwt.json`));

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }
  async login(req, res) {
    try {
      AuthValidator.validateAuthLogin(req.body);
      const { username, password } = req.body;
      const { users } = JSON.parse(this._usersData);
      const user = users.find(user => user.username === username);
      if(!user) {
        throw new NotFoundError('User tidak ditemukan');
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new InvariantError('Username atau Password yang dimasukan salah');
      } else {
        const token = TokenManager.generateAccessToken(username);
        const accessToken = JSON.parse(this._accessTokens);
        accessToken.jwt.push(token);
        fs.writeFileSync(path.resolve(`${__dirname}/../data/jwt.json`), Buffer.from(JSON.stringify(accessToken)));
        res.status(200).send({
          status: 'success',
          data: {
            token,
          }
        });
      }
    } catch (error) {
      if (error instanceof ClientError) {
        res.status(error.statusCode).send({
          'status': 'fail',
          message: error.message
        });
        return;
      }
      res.status(500).send({
        'status': 'fail',
        message: 'Terjadi kesalahan pada server',
      });
    }
  }
  async register(req, res) {
    try {
      AuthValidator.validateAuthRegister(req.body);
      const { username, password, name } = req.body;
      const usersData = JSON.parse(this._usersData);
      const isUsernameExist = usersData.users.find(user => user.username === username);
      if(isUsernameExist) {
        throw new InvariantError('Username sudah digunakan');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      usersData.users.push({
        username,
        password: hashedPassword,
        name
      });
      fs.writeFileSync(path.resolve(`${__dirname}/../data/users.json`), Buffer.from(JSON.stringify(usersData)));
      res.status(201).send({
        status: 'success',
        message: 'Berhasil register user',
      });
    } catch (error) {
      if(error instanceof ClientError) {
        res.status(error.statusCode).send({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      res.status(500).send({
        status: 'fail',
        message: 'Terjadi kesalahan di server',
      });
    }
  }
}

module.exports = AuthController;