import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components /Login';
import Register from '../src/components /Register';
import CreateMatch from '../src/components /CreateMatch';
import UpdateScore from '../src/components /UpdateScore';
import ViewMatch from './components /ViewMatches';
import MatchList from '../src/components /MatchList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-match" element={<CreateMatch />} />
          <Route path="/update-score/:id" element={<UpdateScore />} />
          <Route path="/view-match/:id" element={<ViewMatch />} />
          <Route path="/match" element={<MatchList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
