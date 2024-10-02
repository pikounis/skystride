import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { MapControls, OrbitControls, Text } from '@react-three/drei';
import gsap from 'gsap';  
import axios from 'axios';
import { APIPath } from '../../../../util';


// Coin component (same as before)
// const Coin = ({ index, imageFront, imageBack, position}) => {
//   const ref = useRef();
//   // const [position] = useState([index * 1.5, 0, 0]);

//   const frontTexture = useLoader(THREE.TextureLoader, imageFront);
//   const backTexture = useLoader(THREE.TextureLoader, imageBack);

//   useEffect(() => {
//     frontTexture.rotation = Math.PI / 2;
//     frontTexture.center.set(0.5, 0.5);
//     frontTexture.needsUpdate = true;
//   }, [frontTexture]);

//   useFrame(() => {
//     ref.current.rotation.z += 0.012;
//   });

//   return (
//     <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={position} >
//       <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
//       <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
//       <meshBasicMaterial map={frontTexture} attachArray="material" />
//       <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} attachArray="material" />
//       <meshBasicMaterial map={backTexture} attachArray="material" />
//     </mesh>
//   );
// };

const Coin = ({ index, imageFront, imageBack, position }) => {
  const ref = useRef();
  const tooltipRef = useRef();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCircularText, setShowCircularText] = useState(false); // State to toggle circular text visibility

  const { camera } = useThree();

  const frontTexture = useLoader(THREE.TextureLoader, imageFront);
  const backTexture = useLoader(THREE.TextureLoader, imageBack);

  useEffect(() => {
    frontTexture.rotation = Math.PI / 2;
    frontTexture.center.set(0.5, 0.5);
    frontTexture.needsUpdate = true;
  }, [frontTexture]);

  useFrame(() => {
    ref.current.rotation.z += 0.012;

    // if (showTooltip && tooltipRef.current) {
    //   // Make tooltip face the camera
    //   tooltipRef.current.lookAt(camera.position);
    // }
  });

  const handleClick = () => {
    // setShowTooltip(!showTooltip); // Toggle tooltip visibility
  };

  // const handleHover = (hovered) => {
  //   setShowCircularText(hovered); // Show circular text on hover
  // };

  // Circular text generation
  const circularText = "CIRCULAR TEXT AROUND COIN"; // Customize the circular text here
  const radius = 0.35; // Radius of the circular text around the coin
  const charAngle = (2 * Math.PI) / circularText.length; // Angle between each character


  return (
    <group>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={position} onClick={handleClick}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
        <meshBasicMaterial map={frontTexture} attachArray="material" />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} attachArray="material" />
        <meshBasicMaterial map={backTexture} attachArray="material" />

        { showTooltip &&
          circularText.split("").map((char, i) => {
            const angle = i * charAngle; // Angle for each character
            const x = radius * Math.cos(angle); // Calculate x position
            const y = radius * Math.sin(angle); // Calculate y position
  
            return (
              <Text
                key={i}
                position={[x, 0.02, y]} // Position each character
                rotation={[Math.PI / 2, 0, angle - Math.PI / 2]} // Rotate character to face outward
                fontSize={0.1}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {char}
              </Text>
            );
          })

        }
      </mesh>
      {}
      {
      // showTooltip && (
      //   <mesh ref={tooltipRef} position={[position[0] + 0.3, position[1], position[2] - 0.5]} rotation={[0, Math.PI/6, 0]}>
      //     <boxGeometry args={[1.3, 0.6, 0.1]} />
      //     <meshStandardMaterial color="#FFFFFF" />
      //     {/* Tooltip text can be rendered as texture, or you can use DOM for text */}
      //     <mesh>
      //     <Text color={"red"} fontSize={0.3} position={[0,0,0.1]}>
      //       Hello
      //       <meshStandardMaterial color={"#803d1c"} />
      //     </Text>
      //       {/* <planeGeometry args={[0.7, 0.3]} /> */}
      //       <meshBasicMaterial>
              
      //         {/* <textGeometry attach="geometry" args={['Tooltip Text', { size: 0.5, height: 0.1 }]} /> */}
      //         {/* <Text scale={1} position={position}> HELLOO </Text> */}
      //         <meshBasicMaterial color="black" />
      //       </meshBasicMaterial>
      //     </mesh>
      //   </mesh>
      // )
      }

      {/* Circular Text on hover */}
      {/* {true &&
        circularText.split("").map((char, i) => {
          const angle = i * charAngle; // Angle for each character
          const x = radius * Math.cos(angle); // Calculate x position
          const y = radius * Math.sin(angle); // Calculate y position

          return (
            <Text
              key={i}
              position={[x, y, 0.06]} // Position each character
              rotation={[0, 0, angle - Math.PI / 2]} // Rotate character to face outward
              fontSize={0.05}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {char}
            </Text>
          );
        })} */}
    </group>
  );
};

const Coins = ({ badgeImages, moveLeft, moveRight, angleStep, radius }) => {
  const ref = useRef();
  // const [rotationOffset, setRotationOffset] = useState(0); // Control rotation with buttons

  return (
    <group ref={ref} rotation={[0, 0, 0]}>
      {badgeImages.map((badge, i) => {
        const angle = i * angleStep; // Calculate angle for each coin
        const x = radius * Math.cos(angle); // Convert polar to cartesian coordinates
        const z = radius * Math.sin(angle);

        return (
          <Coin
            key={i}
            index={i}
            imageFront={badge.front}
            imageBack={badge.back}
            position={[z, 0, x]} // Position the coin based on calculated coordinates
          />
        );
      })}
    </group>
  );
};


const Controls = ({angleStep, badgeCount}) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.setAzimuthalAngle(angleStep * ((badgeCount - 1)/2));
      controlsRef.current.update(); // Ensure the controls are updated with the camera position
    }
  }, [camera]);

  

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]} // Pass the camera and domElement (canvas) to the controls
      enableRotate={true}       
      enableZoom={false}        
      enablePan={false}           
      screenSpacePanning={true}  
      rotateSpeed={0.1}
      minAzimuthAngle={0}         // Minimum angle
      maxAzimuthAngle={angleStep * 8}          // Maximum angle
      minPolarAngle={Math.PI / 2}  // Optional, restrict up/down rotation
      maxPolarAngle={Math.PI / 2}  // Optional, restrict up/down rotation
    />
  );
};

// BadgeBar component with arrow buttons
const BadgeBar = () => {
  const skyUserId = 1;
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [badgeImages, setBadgeImages] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`${APIPath}/achievement/getMyAchievements/${skyUserId}`);
        
        // Transform the achievements data into the format required for badgeImages
        const transformedBadges = response.data.map((achievement) => ({
          front: achievement.img,  // Use the image from the achievement for both front and back
          back: achievement.img
        }));

        setBadgeImages(transformedBadges);  // Update state with transformed data
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, [skyUserId]);  // Fetch data when skyUserId changes


  // const badgeImages = [
  //   { front: '/images/boxing-badge.png', back: '/images/boxing-badge.png' },
  //   { front: '/images/cycling-badge.png', back: '/images/cycling-badge.png' },
  //   { front: '/images/football-badge.png', back: '/images/football-badge.png' },
  //   { front: '/images/racketssports-badge.png', back: '/images/racketssports-badge.png' },
  //   { front: '/images/running-badge.png', back: '/images/running-badge.png' },
  //   { front: '/images/strength-training-badge.png', back: '/images/strength-training-badge.png' },
  //   { front: '/images/swimming-badge.png', back: '/images/swimming-badge.png' },
  //   { front: '/images/walking-badge.png', back: '/images/walking-badge.png' },
  //   { front: '/images/yoga-badge.png', back: '/images/yoga-badge.png' },
    
  // ];

  // Handlers for button presses (start and stop movement)
  // const handleLeftPress = () => setMoveLeft(true);
  // const handleLeftRelease = () => setMoveLeft(false);
  // const handleRightPress = () => setMoveRight(true);
  // const handleRightRelease = () => setMoveRight(false);

  const angleStep = (2 * Math.PI) / 45; 
  const radius = 10;

  return (
    <div className="badge-bar" style={{ position: 'relative', width: '100%', height: '100px' }}>
      {/* Left Button */}
      {/* <Button
        variant="contained"
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        onMouseDown={handleLeftPress}
        onMouseUp={handleLeftRelease}
        onMouseLeave={handleLeftRelease}
      >
        <ArrowBack />
      </Button> */}

      {/* Canvas containing the coins */}
      <Canvas camera={{ position: [0, 0, 25], fov: 3 }} style={{ height: '100px', width: '100%' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <Coins badgeImages={badgeImages} moveLeft={moveLeft} moveRight={moveRight} angleStep={angleStep} radius={radius}/>
        <Controls badgeCount={badgeImages.length} angleStep={angleStep}/>
      </Canvas>

      {/* Right Button */}
      {/* <Button
        variant="contained"
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
        onMouseDown={handleRightPress}
        onMouseUp={handleRightRelease}
        onMouseLeave={handleRightRelease}
      >
        <ArrowForward />
      </Button> */}
    </div>
  );
};

export default BadgeBar;
