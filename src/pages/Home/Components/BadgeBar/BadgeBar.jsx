import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Badge from '../Badge/Badge.jsx';
import Box from '@mui/material/Box';


const mockBadges = 
  {
    achievementBadges: [
    "https://png.pngtree.com/png-vector/20240723/ourlarge/pngtree-athletic-runner-vintage-badge-design-png-image_12965334.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM6kco1vTUHJToNzQBlwRoI1stXwneicJ1_g&s",
    "https://img.freepik.com/premium-vector/young-girl-hiking-backpack-with-walking-stick-badge_18591-5527.jpg",
    "https://www.tolleybadges.co.uk/wp-content/uploads/2015/12/216-blank.png",
    "https://64.media.tumblr.com/f2033cae50aa722d209ad106b6b89f4f/tumblr_mfspw6aC0I1rha3vbo1_500.png"
  ]
  };

function BadgeBar() {
  var settings = {
    // infinite repeats badges while scrolling
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Slider 
    return (
      <Box sx={{p: 2,
        boxShadow: "0 4px 2px -2px rgba(0, 0, 0, 0.2)",
        height: '100px',
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
