// routes/umpireRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Umpire = require('../models/Umpire');
const config = require('config');

const router = express.Router();

// @route   POST /api/umpires/register
// @desc    Register an umpire
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let umpire = await Umpire.findOne({ email });

    if (umpire) {
      return res.status(400).json({ msg: 'Umpire already exists' });
    }

    umpire = new Umpire({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    umpire.password = await bcrypt.hash(password, salt);

    await umpire.save();

    const payload = {
      umpire: {
        id: umpire.id
      }
    };

    const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
