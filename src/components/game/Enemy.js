import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Enemy = ({ position, onHit }) => {
  const meshRef = useRef();
  const [isHit, setIsHit] = useState(false);
  const [bobOffset, setBobOffset] = useState(0);

  // Bobbing motion
  useFrame((state) => {
    setBobOffset(Math.sin(state.clock.elapsedTime * 3) * 0.5);
  });

  // Visual feedback when hit
  const handleHit = () => {
    setIsHit(true);
    onHit();
    setTimeout(() => setIsHit(false), 200);
  };

  return (
    <group position={[position[0], position[1] + bobOffset, position[2]]}>
      {/* Main enemy body */}
      <mesh ref={meshRef} castShadow onClick={handleHit}>
        <boxGeometry args={[2, 4, 1]} />
        <meshStandardMaterial 
          color={isHit ? "#FF0000" : "#e94560"}
          emissive={isHit ? "#FF0000" : "#e94560"}
          emissiveIntensity={isHit ? 0.8 : 0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Tech armor plates */}
      <mesh position={[0, 1, 0.6]} castShadow>
        <boxGeometry args={[1.8, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#0f3460"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, -1, 0.6]} castShadow>
        <boxGeometry args={[1.8, 0.3, 0.1]} />
        <meshStandardMaterial 
          color="#0f3460"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing eyes */}
      <mesh position={[0, 1.5, 0.6]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial 
          color="#4ECDC4"
          emissive="#4ECDC4"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, 0.5, 0.6]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial 
          color="#4ECDC4"
          emissive="#4ECDC4"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Energy field around enemy */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial 
          color="#e94560"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </group>
  );
};

export default Enemy;
