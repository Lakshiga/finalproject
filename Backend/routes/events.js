const express = require('express');
const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const { createEvent } = require('../controllers/eventController');

const router = express.Router();

// @route   POST /api/events
// @desc    Create a new event (Organizer only)
// @access  Private (Organizer)
router.post('/event', auth, checkRole('Organizer'), createEvent);

module.exports = router;
