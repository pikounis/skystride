import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Badge from '../Badge/Badge.jsx';
import Box from '@mui/material/Box';
import boxingBadge from "./static/boxing-badge.png";
import cyclingBadge from "./static/cycling-badge.png";
import footballBadge from "./static/football-badge.png";
import racketssportsBadge from "./static/racketssports-badge.png";
import runningBadge from "./static/running-badge.png";
import strengthTrainingBadge from "./static/strength-training-badge.png";
import swimmingBadge from "./static/swimming-badge.png";
import walkingBadge from "./static/walking-badge.png";
import yogaBadge from "./static/yoga-badge.png";

const mockBadges = 
  {
    achievementBadges: [
    boxingBadge,
    footballBadge,
    runningBadge,
    cyclingBadge,
    racketssportsBadge,
    swimmingBadge,
    strengthTrainingBadge,
    walkingBadge,
    yogaBadge
    ]
  };

function BadgeBar() {
  var settings = {
    // infinite repeats badges while scrolling
    // infinite: true,
    speed: 500,
    dots: true,
    centerMode: true,
    // how many badges are shown on the badge
    slidesToShow: 7,
    slidesToScroll: 1,
    // initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          dots: true,
          centerMode: true,
          // slidesToScroll: 1,
          // infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          dots: true,
          centerMode: true,
          slidesToScroll: 1,
          // initialSlide: 2
          // infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          dots: true,
          centerMode: true,
          slidesToScroll: 1,
          // infinite: true
        }
      }
    ]
  };

  // Slider 
    return (
      <Box sx={{p: 2,
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
        height: '125px',
      }}>
        <Slider {...settings}>

          {mockBadges.achievementBadges.map((badge) => (
            <Badge achievement={badge}/>
          ))}

        </Slider>
      </Box>
    );
}

export default BadgeBar;
