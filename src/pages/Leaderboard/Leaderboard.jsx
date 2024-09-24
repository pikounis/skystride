import React from 'react';
import RankingCard from './components/Component1/RankingCard';
import lionlogo from './Static/lionlogo.jpeg';
import demonlogo from './Static/demonlogo.jpeg';
import kitsunelogo from './Static/kitsunelogo.jpg';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'; // Import the icon


// action points:
// change the padding and shape around the team profile
//style the team name font better
//spacing for points above the bar

function Leaderboard() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#6a11cb' }}>Top Teams</h1>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'center'}}>

        <RankingCard
          rank={1}
          teamName="Sky central coders"
          points={85}
          profileImage= {lionlogo}
        />
        <RankingCard
          rank={2}
          teamName=" Hub hackers"
          points={75}
          profileImage={demonlogo}
        />
        <RankingCard
          rank={3}
          teamName="Pythonic Pavilion"
          points={65}
          profileImage={kitsunelogo}
        />
      </div>
    </div>
  );
}

export default Leaderboard;
