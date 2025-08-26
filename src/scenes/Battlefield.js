import React, { useState, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Line } from '@react-three/drei';
import { useInput } from '../hooks/useInput';
import { usePhysics } from '../hooks/usePhysics';
import '../styles/game.css';

// Trajectory line component - Dotted trail to hitting point
function TrajectoryLine({ startPos, direction, power, isVisible }) {
  if (!isVisible) return null;

  // Calculate hitting point
  const hitPointX = startPos[0] + direction[0] * 20;
  const hitPointZ = startPos[2] + direction[2] * 20;
  
  // Create dotted trail with 20 dots
  const dots = [];
  const numDots = 20;
  
  for (let i = 0; i < numDots; i++) {
    const t = i / (numDots - 1);
    const x = startPos[0] + direction[0] * 20 * t;
    const y = startPos[1] + direction[1] * 20 * t - (9.81 * (20 * t) * (20 * t)) / 2; // Gravity effect
    const z = startPos[2] + direction[2] * 20 * t;
    
    if (y < 0) break; // Stop if below ground
    
    dots.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.1, 4, 4]} />
        <meshBasicMaterial color="#4ECDC4" transparent opacity={0.8} />
      </mesh>
    );
  }

  return <>{dots}</>;
}

// Ground component with physics
function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: 'Static',
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2c3e50" />
    </mesh>
  );
}

// Player Shoe (box1) component
function PlayerShoe({ position, rotation, onThrow, isCharging }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position,
    type: 'Dynamic',
    args: [0.5, 0.5, 0.5],
    name: 'box1',
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={isCharging ? "#e74c3c" : "#3498db"} />
    </mesh>
  );
}

// Enemy (neten) component
function Enemy({ position }) {
  const [ref, api] = useBox(() => ({
    mass: 0,
    position: position,
    type: 'Static',
    args: [2, 2, 2],
    name: 'neten',
  }));

  const [currentPos, setCurrentPos] = useState(position);
  const [direction, setDirection] = useState(1);
  const speed = 0.08; // Increased speed
  const bounds = 6;

  // Enemy movement (ping-pong)
  useFrame(() => {
    if (api && api.position) {
      const newX = currentPos[0] + speed * direction;
      if (newX > bounds || newX < -bounds) {
        setDirection(-direction);
        const clampedX = newX > bounds ? bounds : -bounds;
        const newPos = [clampedX, currentPos[1], currentPos[2]];
        setCurrentPos(newPos);
        api.position.set(...newPos);
      } else {
        const newPos = [newX, currentPos[1], currentPos[2]];
        setCurrentPos(newPos);
        api.position.set(...newPos);
      }
    }
  });

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#e67e22" />
    </mesh>
  );
}

// Thrown projectile component
function ThrownShoe({ position, velocity, onCollide }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position,
    velocity: velocity,
    type: 'Dynamic',
    args: [0.5, 0.5, 0.5],
  }));

  // Handle collision with enemy
  useEffect(() => {
    if (api && api.collision) {
      api.collision.subscribe((event) => {
        if (event && event.body && event.body.name === 'neten') {
          console.log('Hit!');
          onCollide();
        }
      });
    }
  }, [api, onCollide]);

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#9b59b6" />
    </mesh>
  );
}

// Main Battlefield component
function Battlefield({ onReturnToMenu, updateChargePower }) {
  const { camera, mouse } = useThree();
  const { getAimRotation, chargePower, isCharging, resetCharge, maxPower } = useInput();
  const { calculateThrowVelocity } = usePhysics();
  
  const [shoes, setShoes] = useState([]);
  const [shoePosition, setShoePosition] = useState([0, 0.5, 8]); // Moved further back
  const [enemyPosition, setEnemyPosition] = useState([0, 1, -12]); // Closer to player
  const [gameActive, setGameActive] = useState(true);
  const [trajectoryDirection, setTrajectoryDirection] = useState([0, 0.2, -1]);
  const [showTrajectory, setShowTrajectory] = useState(true); // Always show trajectory

  // Position camera behind and above the player
  useEffect(() => {
    camera.position.set(0, 4, 12); // Adjusted camera position
    camera.lookAt(0, 0, -5);
  }, [camera]);

  // Lift shoe when scene starts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShoePosition([0, 1.5, 8]); // Lifted position
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Ensure trajectory is visible immediately
  useEffect(() => {
    setShowTrajectory(true);
  }, []);

  // Calculate trajectory based on mouse position and power
  useFrame(() => {
    // Update charge power in game state
    updateChargePower(chargePower);
    
    // Get mouse position (-1 to 1 range)
    const mouseX = mouse.x; // Left/Right position
    const mouseY = mouse.y; // Up/Down position (affects distance)
    
    // Calculate hitting point (yellow dot position)
    const hitPointX = shoePosition[0] + (mouseX * 3); // Left/Right movement (extended range)
    const hitPointZ = Math.max(
      shoePosition[2] - 2, // Minimum distance (near shoe)
      Math.min(
        shoePosition[2] - 18, // Maximum distance (beyond enemy)
        shoePosition[2] - (mouseY * 8) // Inverted: mouse up = far, mouse down = near
      )
    );
    
    // Calculate direction from shoe to hitting point
    const directionX = (hitPointX - shoePosition[0]) / 20;
    const directionZ = (hitPointZ - shoePosition[2]) / 20;
    const directionY = 0.3; // Slight upward angle
    
    // Calculate power scaling
    const powerScale = 0.3 + (chargePower / maxPower) * 2.7; // 0.3 to 3.0 range (more dramatic scaling)
    
    // Create final direction vector
    const finalDirection = [
      directionX * powerScale,
      directionY,
      directionZ * powerScale
    ];
    
    setTrajectoryDirection(finalDirection);
  });

  // Handle throwing when mouse is released
  useEffect(() => {
    if (!isCharging && chargePower > 0) {
      // Use trajectory direction for throwing
      const baseForce = 30; // Increased base force
      const powerMultiplier = chargePower / maxPower;
      const force = baseForce * powerMultiplier;
      
      const velocity = trajectoryDirection.map(d => d * force);
      
      const newShoe = {
        id: Date.now(),
        position: [...shoePosition],
        velocity: velocity
      };

      setShoes(prev => [...prev, newShoe]);
      resetCharge();
    }
  }, [isCharging, chargePower, trajectoryDirection, shoePosition, resetCharge, maxPower]);

  // Handle collision
  const handleCollision = (shoeId) => {
    setShoes(prev => prev.filter(shoe => shoe.id !== shoeId));
  };

  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Ground */}
      <Ground />

      {/* Player Shoe */}
      <PlayerShoe
        position={shoePosition}
        rotation={[0, (getAimRotation() * Math.PI) / 180, 0]}
        onThrow={() => {}}
        isCharging={isCharging}
      />

      {/* Enemy */}
      <Enemy position={enemyPosition} />

      {/* Trajectory Line */}
      <TrajectoryLine
        startPos={shoePosition}
        direction={trajectoryDirection}
        power={chargePower}
        isVisible={showTrajectory}
      />
      
      {/* Yellow dot - Hitting point predictor */}
      <mesh position={[
        shoePosition[0] + (mouse.x * 3), // X movement (left/right) - extended range
        0.1, // Slightly above ground
        Math.max(
          shoePosition[2] - 2, // Minimum distance (near shoe)
          Math.min(
            shoePosition[2] - 18, // Maximum distance (beyond enemy)
            shoePosition[2] - (mouse.y * 8) // Inverted: mouse up = far, mouse down = near
          )
        )
      ]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshBasicMaterial color="#FFFF00" />
      </mesh>

      {/* Thrown Shoes */}
      {shoes.map(shoe => (
        <ThrownShoe
          key={shoe.id}
          position={shoe.position}
          velocity={shoe.velocity}
          onCollide={() => handleCollision(shoe.id)}
        />
      ))}
    </Physics>
  );
}

export default Battlefield;
