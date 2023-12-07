// GameScreen.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const backendUrl = 'http://localhost:5000';

export default function Game({ roundInfo, onError, onEnd }) {
  const [roundData, setRoundData] = useState(roundInfo);
  const [timeLeft, setTimeLeft] = useState(roundInfo['roundLength']);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const initialRender = useRef(true);
  const isPaused = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused.current) {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [roundData]);

  useEffect(() => {
    setMinutes(Math.floor(timeLeft / 60));
    setSeconds(timeLeft % 60);
    if (timeLeft === 0 && !initialRender.current) onChangeRound();
    else initialRender.current = false;
  }, [timeLeft]);

  const onChangeRound = () => {
    axios.get(backendUrl + '/newround').then((response) => {
      setTimeLeft(response.data['roundLength']);
      setRoundData(response.data);
      initialRender.current = true;
    });
  };

  const handlePause = () => {
    isPaused.current = true;
  };

  const handleResume = () => {
    isPaused.current = false;
  };

  const handleEnd = () => {
    onEnd()
  };

  return (
    <div className="game-screen">
      <h1>Game in Progress</h1>
      <p>Round: {roundData['roundNumber']}</p>
      <p>
        Length of Round: {roundData['roundLength'] / 60} minute
        {parseInt(roundData['roundLength']) > 1 ? 's' : ''}
      </p>
      <p>Small Blind: {roundData['smallBlind']}</p>
      <p>Big Blind: {roundData['bigBlind']}</p>
      <div className="game-buttons">
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleResume}>Resume</button>
        <button onClick={handleEnd}>End Game</button>
      </div>
      <div className="countdown-container">
        <p className='countdown'>
            Time Left: {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
        </p>
      </div>
      <br />
      <br />
    </div>
  );
}
