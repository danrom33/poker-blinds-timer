// page.js
'use client'
import React, { useState } from 'react';
import Start from '@/components/StartScreen';
import Game from '@/components/GameScreen';
import ErrorPopup from '@/components/ErrorPopup';
import '@/components/styles.css'; // Import the CSS file

export default function Home() {
  const [start, setStart] = useState(false);
  const [roundData, setRoundData] = useState({
    roundNumber: 0,
    smallBlind: null,
    bigBlind: null,
    roundLength: null,
  });
  const [error, setError] = useState(null)

  const handleGameStart = (data) => {
    setStart(true);
    setRoundData(data);
  };

  const handleError = (err_message) => {
    setError(err_message)
  }

  const closeError =() => {
    setError(null)
  }

  const endGame = () => {
    setStart(false)
  }

  return (
    <div className="app-container"> {/* Added a class name */}
      {start ? (
        <Game roundInfo={roundData} onError={handleError} onEnd={endGame}/>
      ) : (
        <Start onGameStart={handleGameStart} onError={handleError}/>
      )}
      {error && <ErrorPopup message={error} onClose={closeError}/>}
    </div>
  );
}
