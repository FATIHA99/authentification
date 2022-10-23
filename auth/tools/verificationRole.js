const jwt = require('jsonwebtoken')
const ls = require('local-storage')

function verificationRole(access) {
  return (req, res, next) => {
    if (ls('token')) {
      const t = ls('token');
      const token = jwt.verify(t, process.env.SECRETWORD)
      if (token) {
        req.data = token;
        if (access.includes(req.data.data.role)) { next() }
        else { res.send('no user have this role ') }
      }
      else {
        res.send('token not valid')
      }
    }
    else { res.send('token not found ') }
  }
}

module.exports = { verificationRole }