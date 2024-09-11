// routes/organizerRoutes.js
const express = require('express');
const Umpire = require('../models/Umpire');
const auth = require('../middleware/authMiddleware'); // Organizer authentication
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// @route   PUT /api/organizers/approve-umpire/:id
// @desc    Approve umpire registration (Organizer only)
// @access  Private (Organizer)
router.put('/approve-umpire/:id', auth, checkRole('Organizer'), async (req, res) => {
  try {
    const umpire = await Umpire.findById(req.params.id);
    if (!umpire) return res.status(404).json({ msg: 'Umpire not found' });

    umpire.isVerified = true;
    await umpire.save();

    res.status(200).json({ msg: 'Umpire approved successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
