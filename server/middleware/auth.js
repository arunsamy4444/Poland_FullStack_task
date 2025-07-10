// middleware/auth.js
module.exports = function (req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Basic ')) {
    return res.status(401).send('Unauthorized');
  }

  const base64 = auth.split(' ')[1];
  const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');

  if (
    user === process.env.BASIC_USER &&
    pass === process.env.BASIC_PASS
  ) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};
