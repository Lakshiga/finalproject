const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');

    // Check if the authorization header is present
    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Extract token by removing the 'Bearer ' prefix
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

    // Check if the token was extracted properly
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Assign user data from token to request object
    req.user = decoded.user;

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
