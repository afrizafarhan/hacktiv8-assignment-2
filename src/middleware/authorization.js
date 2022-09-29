const Authorization = {
  userAuthorization: (req, res) => {
    const { username } = res.local.user
    console.log(username);
    next();
  }
}

module.exports = Authorization;