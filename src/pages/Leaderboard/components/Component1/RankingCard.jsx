import React from 'react';
import styles from './RankingCard.module.css';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Box, Typography } from '@mui/material';


function RankingCard({ rank, teamName, points, profileImage }) {
  return (
    <Box className={styles.rankingCard}>
      <Box className={styles.rankBadge}>{rank}</Box>
      <Box className={styles.cardContent}>
        {/* <LeaderboardIcon className={styles.leaderboardIcon} /> */}
        <img src={profileImage} alt={`${teamName} logo`} className={styles.profileImage} />
        <Typography variant='h4' className={styles.teamName}>{teamName}</Typography>
        <Typography variant='h5' sx={{fontWeight: 'bold'}}>Points: {points}</Typography>
        {/* <div className={styles.pointsContainer}>
          <span className={styles.pointsLabel}>Points</span>
          <div className={styles.pointsBar}>
            <div className={styles.pointsFill} style={{ width: `${points}%` }}></div>
          </div>
        </div> */}
      </Box>
    </Box>
  );
}

export default RankingCard;
