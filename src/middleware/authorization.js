const AuthorizationError = require('../exeptions/AuthorizationError');
const UserService = require('../services/UserService');
const Authorization = {
  userAuthorization: (req, res, next) => {
    try {
      const { id } = res.locals.user
      const userService = new UserService();
      const user = userService.getUserById(req.params.id);
      if(id !== user.id) {
        throw new AuthorizationError('Kamu tidak memiliki akses ke resource ini :)');
      }
      next();
    } catch (error) {
      if(error instanceof AuthorizationError) {
        res.status(error.statusCode).json({
          status: 'fail',
          message: error.message
        });
        return;
      }

      res.status(500).json({
        status: 'fail',
        message: error.message
      });
    }
  }
}

module.exports = Authorization;