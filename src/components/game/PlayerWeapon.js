import React from 'react';

const PlayerWeapon = ({ position = [0, 0.5, 0], rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main weapon body */}
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.3, 1]} />
        <meshStandardMaterial 
          color="#4A90E2"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Tech details */}
      <mesh position={[0, 0.2, 0.4]} castShadow>
        <boxGeometry args={[0.4, 0.1, 0.2]} />
        <meshStandardMaterial 
          color="#45B7D1"
          emissive="#45B7D1"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>


    </group>
  );
};

export default PlayerWeapon;
