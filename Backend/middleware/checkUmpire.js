// middleware/checkUmpire.js
module.exports = function (req, res, next) {
    if (req.user.role !== 'Umpire' || !req.user.isVerified) {
      return res.status(403).json({ msg: 'Access denied. Umpire not verified.' });
    }
    next();
  };
  