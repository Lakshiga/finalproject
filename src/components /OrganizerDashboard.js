import React, { useState } from 'react';
import axios from 'axios';

const OrganizerDashboard = () => {
  const [eventData, setEventData] = useState({
    name: '',
    matchType: 'League',
    players: '',
    umpires: ''
  });

  const onChange = (e) => setEventData({ ...eventData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const players = eventData.players.split(',').map(p => p.trim());
    const umpires = eventData.umpires.split(',').map(u => u.trim());

    await axios.post('/api/events/create-event', {
      ...eventData,
      players,
      umpires
    });
  };

  return (
    <div>
      <h1>Organizer Dashboard - Create Event</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Event Name</label>
          <input type="text" name="name" value={eventData.name} onChange={onChange} required />
        </div>
        <div>
          <label>Match Type</label>
          <select name="matchType" value={eventData.matchType} onChange={onChange}>
            <option value="League">League</option>
            <option value="Knockout">Knockout</option>
          </select>
        </div>
        <div>
          <label>Players (comma-separated)</label>
          <input type="text" name="players" value={eventData.players} onChange={onChange} required />
        </div>
        <div>
          <label>Umpires (comma-separated)</label>
          <input type="text" name="umpires" value={eventData.umpires} onChange={onChange} required />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default OrganizerDashboard;
