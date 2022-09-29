const InvariantError = require('../exeptions/InvariantError');
const AuthenticationError = require('../exeptions/AuthenticationError');
const UserService = require('../services/UserService');
const TokenManager = require('../tokenize/TokenManager');
const ClientError = require('../exeptions/ClientError');

const authentication = async (req, res, next) => {
   try {
      const token = req.headers.authorization;
      if(!token) {
         throw new InvariantError('Butuh header authorization');
      }else{
         const decodedToken = TokenManager.verifyAccessToken(token.split(' ')[1]);
         if(decodedToken) {
            const userService = new UserService();
            const user = userService.getUserByUsername(decodedToken.data);
            if (user) {
               res.locals.user = user;
               next();
            } else {
               throw new AuthenticationError('Unauthorized');
            }
         } else {
            throw new AuthenticationError('Unauthorized');
         }
      }
   } catch (error) {
      if(error instanceof ClientError) {
         res.status(error.statusCode).json({
            status: 'fail',
            message: error.message
         });
         return;
      }
      res.status(500).json(error)
   }
}

module.exports = authentication;
