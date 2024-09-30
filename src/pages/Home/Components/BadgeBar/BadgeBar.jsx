import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { MapControls, OrbitControls } from '@react-three/drei';

// Coin component (same as before)
const Coin = ({ index, imageFront, imageBack }) => {
  const ref = useRef();
  const [position] = useState([index * 1.5, 0, 0]);

  const frontTexture = useLoader(THREE.TextureLoader, imageFront);
  const backTexture = useLoader(THREE.TextureLoader, imageBack);

  useEffect(() => {
    frontTexture.rotation = Math.PI / 2;
    frontTexture.center.set(0.5, 0.5);
    frontTexture.needsUpdate = true;
  }, [frontTexture]);

  useFrame(() => {
    ref.current.rotation.z += 0.012;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 0.05, 12]} />
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} />
      <meshBasicMaterial map={frontTexture} attachArray="material" />
      <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.3} attachArray="material" />
      <meshBasicMaterial map={backTexture} attachArray="material" />
    </mesh>
  );
};

// Coins component with internal movement logic
const Coins = ({ badgeImages, moveLeft, moveRight }) => {
  const ref = useRef();
  const { width, height } = useThree(state => state.viewport)
  const totalWidthOfCoins = (((badgeImages.length - 1) * 1.5) + 0.3);
  // const rightOfCouns = (((badgeImages.length - 1) * 1.5) + 0.3)/2
  const start = Math.max(-width/2 + 0.4, -0.1 - totalWidthOfCoins/2)
  const [position, setPosition] = useState([start, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Update position based on left and right button clicks
  useFrame(() => {
    if (moveLeft) {
      setPosition((prevPos) => [prevPos[0] + 0.1, prevPos[1], prevPos[2]]);
    } else if (moveRight) {
      setPosition((prevPos) => [prevPos[0] - 0.1, prevPos[1], prevPos[2]]);
    }
  });

  return (
    <group ref={ref} position={position}>
      {badgeImages.map((badge, i) => (
        <Coin key={i} index={i} imageFront={badge.front} imageBack={badge.back} />
      ))}
    </group>
  );
};


const Controls = () => {
  const { camera } = useThree()
  const controlsRef = useRef()    
  // const totalWidthOfCoins = (((9 - 1) * 1.5) + 0.3);
  // const { width, height } = useThree(state => state.viewport)




  useFrame(() => {

    if (controlsRef.current) {
      // Get the current target (the point the camera is looking at)
      const target = controlsRef.current.target;

      target.z = 0
      target.y = 0
    }
    if (camera.position.z != 25) {
        camera.position.z = 25
      }

    controlsRef.current.addEventListener('change', function () {
      
      // console.log(camera.position.x, camera.position.x > (totalWidthOfCoins - width)/2 + 0.1)
      // if (camera.position.z != 25) {
      //   camera.position.z = 25
      // }
    })
  }, [])

  return (
    <MapControls ref={controlsRef} enableZoom={false} enableRotate={false}/>
  )

  // return (
  //   <OrbitControls
  //     ref={controlsRef}
  //     enableRotate={false}       // Disable rotation
  //     enableZoom={false}         // Disable zoom (optional, keep if you want zoom disabled)
  //     enablePan={true}           // Enable panning
  //     screenSpacePanning={true}  // Panning will happen in screen space
  //     mouseButtons={{
  //       LEFT: 2, // Assign the pan action to left mouse button (by default, it's the middle button)
  //       RIGHT: 2, // Disable the right mouse button's action (which is rotate by default)
  //     }}
  //   />
  // );
}

// BadgeBar component with arrow buttons
const BadgeBar = () => {
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  const badgeImages = [
    { front: '/images/boxing-badge.png', back: '/images/boxing-badge.png' },
    { front: '/images/cycling-badge.png', back: '/images/cycling-badge.png' },
    { front: '/images/football-badge.png', back: '/images/football-badge.png' },
    { front: '/images/racketssports-badge.png', back: '/images/racketssports-badge.png' },
    { front: '/images/running-badge.png', back: '/images/running-badge.png' },
    { front: '/images/strength-training-badge.png', back: '/images/strength-training-badge.png' },
    { front: '/images/swimming-badge.png', back: '/images/swimming-badge.png' },
    { front: '/images/walking-badge.png', back: '/images/walking-badge.png' },
    { front: '/images/yoga-badge.png', back: '/images/yoga-badge.png' },
    
  ];

  // Handlers for button presses (start and stop movement)
  const handleLeftPress = () => setMoveLeft(true);
  const handleLeftRelease = () => setMoveLeft(false);
  const handleRightPress = () => setMoveRight(true);
  const handleRightRelease = () => setMoveRight(false);

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
      <Canvas camera={{ position: [0, 0, 25], fov: 2 }} style={{ height: '100px', width: '100%' }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <Coins badgeImages={badgeImages} moveLeft={moveLeft} moveRight={moveRight} />
        <Controls />
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
