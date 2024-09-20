// pages/Home.js
import React from 'react';
import LeaderboardsSection from './Components/LeaderboardSection/LeaderboardSection';

function Home() {
  return (
    <div className='container'>
      <h1>Welcome to the Home Page</h1>
      <LeaderboardsSection />
    </div>
  );
}

export default Home;
