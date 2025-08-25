import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Projectile = ({ projectile, enemyPosition, onHit, onMiss, onRemove }) => {
  const meshRef = useRef();
  const [position, setPosition] = useState(projectile.position);
  const [velocity, setVelocity] = useState(projectile.velocity);
  const [active, setActive] = useState(true);
  const [trailPoints, setTrailPoints] = useState([]);
  const gravity = 0.02;

  // Physics update
  useFrame(() => {
    if (!active) return;

    const newVelocity = [
      velocity[0],
      velocity[1] - gravity,
      velocity[2]
    ];

    const newPosition = [
      position[0] + newVelocity[0],
      position[1] + newVelocity[1],
      position[2] + newVelocity[2]
    ];

    setPosition(newPosition);
    setVelocity(newVelocity);

    // Add trail point
    setTrailPoints(prev => [...prev.slice(-19), newPosition]);

    // Check if hit ground
    if (newPosition[1] < 0) {
      setActive(false);
      onMiss();
      setTimeout(() => onRemove(), 1000);
      return;
    }

    // Check if went too far
    if (newPosition[2] < -50) {
      setActive(false);
      onMiss();
      setTimeout(() => onRemove(), 1000);
      return;
    }

    // Check collision with enemy
    const distance = Math.sqrt(
      Math.pow(newPosition[0] - enemyPosition[0], 2) +
      Math.pow(newPosition[1] - enemyPosition[1], 2) +
      Math.pow(newPosition[2] - enemyPosition[2], 2)
    );
    if (distance < 2) {
      setActive(false);
      onHit();
      setTimeout(() => onRemove(), 1000);
      return;
    }
  });

  return (
    <>
      {/* Projectile */}
      <group ref={meshRef} position={position}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.3, 1]} />
          <meshStandardMaterial 
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Energy core */}
        <mesh position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial 
            color="#FF6B6B"
            emissive="#FF6B6B"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Trail effect */}
      {trailPoints.length > 1 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={trailPoints.length}
              array={new Float32Array(trailPoints.flat())}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#FFD700" transparent opacity={0.8} linewidth={3} />
        </line>
      )}

      {/* Energy particles around projectile */}
      {active && (
        <mesh position={position}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial 
            color="#FFD700"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
    </>
  );
};

export default Projectile;
