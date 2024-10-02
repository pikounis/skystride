import React from 'react';
import { Box, IconButton, Typography, Container } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from './Footer.module.css'; 

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ededed',
        py: 3,
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="xl" className={styles.footerContainer}>
        <IconButton onClick={scrollToTop} sx={{ color: 'black' }} className={styles.leftItem}>
          <ArrowUpwardIcon />
        </IconButton>

        <Box className={styles.centerContent}>
          <Box
            component="img"
            src="/images/sky.png"
            alt="Sky Stride Logo"
            sx={{ height: 40 }}
          />
          <Typography variant="body2" sx={{ mt: 1, color: 'black' }}>
            © 2024 Sky Stride by Velocity, Victoria's favorite team.
          </Typography>
        </Box>

        <IconButton
          href="https://github.com/pikounis/skystride"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'black' }}
          className={styles.rightItem}
        >
          <GitHubIcon />
        </IconButton>
      </Container>
    </Box>
  );
}

export default Footer;
