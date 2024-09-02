const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/events
// @access  Organizer
exports.createEvent = async (req, res) => {
  const { name, type, players, umpires } = req.body;

  // Basic validation
  if (!name || !type || !players || !umpires) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  if (!['League', 'Knockout'].includes(type)) {
    return res.status(400).json({ msg: 'Invalid event type' });
  }

  try {
    const event = new Event({
      name,
      matchType: type,
      players,
      umpires,
      organizer: req.user.id,
    });

    await event.save();

    res.status(201).json({
      msg: 'Event created successfully',
      event,
    });
  } catch (err) {
    console.error('Error creating event:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
