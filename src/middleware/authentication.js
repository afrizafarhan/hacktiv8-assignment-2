const TokenManager = require('../tokenize/TokenManager');

const authentication = async (req, res, next) => {
   const token = req.headers.authorization;
   if(!token) {
      res.status(400).send({
         status: 'fail',
         message: 'Butuh header authorization',
      });
   }else{
      if (TokenManager.verifyAccessToken(token.split(' ')[1])) {
       next();
      } else {
         res.sendStatus(401);
      }
   }
}

module.exports = authentication;
