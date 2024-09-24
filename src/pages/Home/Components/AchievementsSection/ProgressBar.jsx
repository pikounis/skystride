import React from 'react'
import styles from './ProgressBar.module.css'

// TO DO
// add param and styling for Badge Images to put in line with text
// Fix ugly ass container lmaoooo
// IF YOU'RE FEELING LUCKY, PUNK
// add style={{ background: `${badgeColors}%`}} to pull unique badge colors for each badge type

function ProgressBar({achievementTitle, achievementProgress, progressLeft, badgeIcon}) {
  return (
        <div className={styles.achievementBox}>
            <img src={badgeIcon} className={styles.badgeIcon}/>
            <span className={styles.title} style={{ verticalAlign: 'right'}}>{achievementTitle}</span>
            <div className={styles.achievementBar}>
                <span className={styles.achievementProgress} style={{ width: `${achievementProgress}%`}}>
                    <span className={styles.pointsLeft}>{progressLeft}pts to go!</span>
                </span>
            </div>
        </div>
  )
}

export default ProgressBar;