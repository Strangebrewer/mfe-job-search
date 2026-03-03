import React from 'react';
import { BrowserRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';

const App: React.FC<any> = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="derp" element={<div>Hey there, Derp!</div>} />
      <Route path="*" element={<div>Error, Will Robintino!</div>} />
    </Routes>
  )
}

export default App;
