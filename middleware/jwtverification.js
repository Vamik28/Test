const jwt = require('jsonwebtoken')



module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[0]
    // console.log(token);
    const decoded = await jwt.verify(token, "abc");
    // console.log('token',token);
    console.log(decoded)
    req.userdata = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Auth fail',
    })
  }
}
