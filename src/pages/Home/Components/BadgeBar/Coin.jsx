// src/components/Coin.jsx
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const Coin = ({ image, position, scale }) => {
  const meshRef = useRef();

  // Load the texture once
  const texture = useLoader(THREE.TextureLoader, image);

  // Adjust texture rotation to make the image upright
  useEffect(() => {
    // Rotate the texture by -90 degrees (clockwise) around its center
    texture.rotation = -Math.PI / 2; // Adjust this value if needed
    texture.center.set(0.5, 0.5); // Set the center of rotation to the center of the texture
    texture.needsUpdate = true; // Inform Three.js that the texture has been updated
  }, [texture]);

  // Create materials for side, top, and bottom
  const materials = useMemo(() => [
    new THREE.MeshBasicMaterial({ color: '#FFD700' }), // Side
    new THREE.MeshBasicMaterial({ map: texture }), // Top
    new THREE.MeshBasicMaterial({ map: texture }), // Bottom
  ], [texture]);

  // Rotate the coin continuously around Z-axis
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01; // Adjust rotation speed as needed
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={[Math.PI / 2, 0, 0]} // Stand upright on its edge
      geometry={new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32)}
      material={materials}
    />
  );
};

Coin.propTypes = {
  image: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Coin;
