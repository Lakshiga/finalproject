// routes/adminRoutes.js
const express = require('express');
const Organizer = require('../models/Organizer');
const auth = require('../middleware/authMiddleware'); // Admin auth middleware
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// @route   PUT /api/admin/verify-organizer/:id
// @desc    Admin verifies organizer registration
// @access  Private (Admin)
router.put('/verify-organizer/:id', auth, checkRole('Admin'), async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);

    if (!organizer) {
      return res.status(404).json({ msg: 'Organizer not found' });
    }

    organizer.isVerified = true; // Mark as verified
    await organizer.save();

    res.status(200).json({ msg: 'Organizer verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
