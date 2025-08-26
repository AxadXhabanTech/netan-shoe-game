import { useEffect, useState } from 'react';

export const useInput = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [chargePower, setChargePower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  const maxPower = 100;
  const chargeRate = 8; // Much faster charging speed

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      setIsCharging(true);
      setChargePower(0);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      setIsCharging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Charge power when mouse is held down
  useEffect(() => {
    if (!isCharging) return;

    const chargeInterval = setInterval(() => {
      setChargePower(prev => {
        if (prev >= maxPower) {
          return maxPower;
        }
        return prev + chargeRate;
      });
    }, 16); // ~60fps

    return () => clearInterval(chargeInterval);
  }, [isCharging]);

  const getAimRotation = () => {
    // Convert mouse X position to rotation (45° to 75°)
    const targetRotation = 60 + (mousePosition.x * 15); // 60° ± 15° = 45° to 75°
    return Math.max(45, Math.min(75, targetRotation));
  };

  const resetCharge = () => {
    setChargePower(0);
    setIsCharging(false);
  };

  return {
    mousePosition,
    isMouseDown,
    chargePower,
    isCharging,
    getAimRotation,
    resetCharge,
    maxPower
  };
};
