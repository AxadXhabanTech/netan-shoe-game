import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    score: 0,
    combo: 0,
    bestCombo: 0,
    isCharging: false,
    chargePower: 0,
    gameActive: false,
    gameTime: 0,
    currentScreen: 'loading',
    restartCount: 0
  });

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Loading simulation
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setIsLoading(false);
            setGameState(prev => ({ ...prev, currentScreen: 'menu' }));
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(loadingInterval);
  }, []);

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'battlefield',
      gameActive: true,
      score: 0,
      combo: 0,
      gameTime: 0,
      chargePower: 0,
      isCharging: false
    }));
  };

  const restartGame = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'battlefield',
      gameActive: true,
      score: 0,
      combo: 0,
      gameTime: 0,
      chargePower: 0,
      isCharging: false,
      restartCount: prev.restartCount + 1
    }));
  };

  const returnToMenu = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'menu',
      gameActive: false
    }));
  };

  const updateScore = (points) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      combo: prev.combo + 1,
      bestCombo: Math.max(prev.bestCombo, prev.combo + 1)
    }));
  };

  const resetCombo = () => {
    setGameState(prev => ({
      ...prev,
      combo: 0
    }));
  };

  const updateChargePower = (power) => {
    setGameState(prev => ({
      ...prev,
      chargePower: power,
      isCharging: power > 0
    }));
  };

  const getChargePower = () => gameState.chargePower;

  return {
    gameState,
    isLoading,
    loadingProgress,
    startGame,
    restartGame,
    returnToMenu,
    updateScore,
    resetCombo,
    updateChargePower,
    getChargePower
  };
};
