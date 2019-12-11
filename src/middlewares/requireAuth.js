const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).send({ error: 'User not authenticated!' })
  }

  const token = authorization.replace('Bearer ', '')
  jwt.verify(token, 'ENCRYPTION_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ err: 'User not authenticated!' })
    }
    const { userId } = payload

    const user = await User.findById(userId)
    req.user = user
    next()
  })
}