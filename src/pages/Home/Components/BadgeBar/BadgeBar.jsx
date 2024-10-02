// BadgeBar.js
import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Badge from '../Badge/Badge.jsx'; // Ensure this path is correct

const mockBadges = {
  achievementBadges: [
    '/images/boxing-badge.png',
    '/images/football-badge.png',
    '/images/running-badge.png',
    '/images/cycling-badge.png',
    '/images/racketssports-badge.png',
    '/images/swimming-badge.png',
    '/images/strength-training-badge.png',
    '/images/walking-badge.png',
    '/images/yoga-badge.png',

    '/images/racketssports-badge.png',
    '/images/swimming-badge.png',
    '/images/strength-training-badge.png',
    '/images/walking-badge.png',
    '/images/yoga-badge.png',
  ],
};

const BadgeBar = () => {
  const badges = mockBadges.achievementBadges;
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Function to check arrow visibility
  const checkForArrows = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkForArrows();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkForArrows);
      window.addEventListener('resize', checkForArrows);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkForArrows);
      }
      window.removeEventListener('resize', checkForArrows);
    };
  }, [badges]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = window.innerWidth * 1/2; // Adjust scroll amount as needed
      const newScrollPosition =
        direction === 'left'
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100px',
        width: '100%',
        backgroundColor: '#f5f5f5', // Adjust background as needed
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Left Arrow */}
      {showLeftArrow && (
        <IconButton
          onClick={() => scroll('left')}
          sx={{
            position: 'absolute',
            left: '20px',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid black',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <AiOutlineArrowLeft />
        </IconButton>
      )}

      {/* Scrollable Badges Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          padding: '0 40px', // Space for arrows
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        }}
      >
        {badges.map((badge, index) => (
          <Box
            key={index}
            sx={{
              margin: '10px 40px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 0 10px 2px rgba(255, 215, 0, 0.7)', // Glowing effect
              },
          }}>
            <Badge achievement={badge} />
          </Box>
        ))}
      </Box>

      {/* Right Arrow */}
      {showRightArrow && (
        <IconButton
          onClick={() => scroll('right')}
          sx={{
            position: 'absolute',
            right: '20px',
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid black',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          <AiOutlineArrowRight />
        </IconButton>
      )}
    </Box>
  );
};

export default BadgeBar;
