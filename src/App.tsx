import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import { RequireAuth, RequireGuest, useUserStore } from '@bka-stuff/mfe-utils';
import Home from './pages/Home';

const App: React.FC<any> = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/* these routes are only to demo how routes can be built */}
      <Route path="authorized" element={<div> This page is for authorized users</div>} />
      <Route path="guest" element={<div> This page is for guests</div>} />

      <Route element={<RequireGuest redirectUrl='/job-search/authorized'/>}>
        <Route path="no-login" element={<div>You Are NOT Logged In!</div>} />
      </Route>
      
      <Route element={<RequireAuth redirectUrl='/job-search/guest' />}>
        <Route path="yep-login" element={<div>You Are Logged In!</div>} />
      </Route>

      <Route path="derp" element={<div>Hey there, Derp!</div>} />

      <Route path="*" element={<div>Error, Will Robintino!</div>} />
    </Routes>
  )
}

export default App;
