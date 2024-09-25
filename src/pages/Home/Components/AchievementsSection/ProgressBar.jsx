import React from 'react'
import styles from './ProgressBar.module.css'
import { Box, Typography } from '@mui/material';
import Proptypes from 'prop-types';

// TO DO
// add param and styling for Badge Images to put in line with text
// Fix ugly ass container lmaoooo
// IF YOU'RE FEELING LUCKY, PUNK
// add style={{ background: `${badgeColors}%`}} to pull unique badge colors for each badge type

function ProgressBar({ achievementTitle, achievementProgress, progressLeft, badgeIcon }) {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'ce'
        }} className={styles.achievementBox}>
            <img src={badgeIcon} className={styles.badgeIcon} />
            <Box sx={{width: "100%"}}>
                <Typography variant='h6' className={styles.title} sx={{fontWeight: 'bolder'}}>{achievementTitle}</Typography>
                <div className={styles.achievementBar}>
                    <Box className={styles.achievementProgress} sx={{ width: `${achievementProgress}%` }}> {/* Changed span to Box as it doesn't have text in it - correct mui container class is Box -> for this, style is changed to sx */}
                        <Typography variant='h7' className={styles.pointsLeft}>{progressLeft}pts to go!</Typography> {/* Span changed to Typography as it's the correct text MUI component. -> Typography uses variant for text size and style so we used h7*/}
                    </Box>
                </div>
            </Box>

        </Box>
    )
}

ProgressBar.propType = {
    achievementTitle: Proptypes.string.isRequired,
    achievementProgress: Proptypes.number.isRequired,
    progressLeft: Proptypes.number.isRequired,
    badgeIcon: Proptypes.string.isRequired
}

export default ProgressBar;