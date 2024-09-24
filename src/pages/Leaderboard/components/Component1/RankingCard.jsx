import React from 'react';
import styles from './RankingCard.module.css';

function RankingCard({ rank, teamName, points, profileImage }) {
  return (
    <div className={styles.rankingCard}>
      <div className={styles.rankBadge}>{rank}</div>
      <div className={styles.cardContent}>
        <img src={profileImage} alt={`${teamName} logo`} className={styles.profileImage} />
        <h2 className={styles.teamName}>{teamName}</h2>
        <div className={styles.pointsContainer}>
          <span className={styles.pointsLabel}>Points</span>
          <div className={styles.pointsBar}>
            <div className={styles.pointsFill} style={{ width: `${points}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RankingCard;
