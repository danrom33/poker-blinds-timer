// GameScreen.js
import React, { useState, useEffect, useRef } from 'react';
import EditPopup from '@/components/EditPopup';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const backendUrl = 'http://localhost:5000';

export default function Game({ roundInfo, onEnd, onError }) {
  const [roundData, setRoundData] = useState(roundInfo);
  const [timeLeft, setTimeLeft] = useState(roundInfo['roundLength']);
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const initialRender = useRef(true);
  const isPaused = useRef(false);
  const[edit, setEdit] = useState(false)

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

  const handleEdit= () => {
    isPaused.current = true
    setEdit(true)
  }

  const closeEdit = () => {
    console.log("Close")
    setEdit(false)
    isPaused.current = false;
  }

  return (
    <div className="game-screen">
      <h1>Game in Progress</h1>
      <p className="round-info">Round: {roundData['roundNumber']}</p>
      <p className="round-info">
        Length of Round: {roundData['roundLength'] / 60} minute
        {parseInt(roundData['roundLength']) > 1 ? 's' : ''}
      </p>
      <p className="round-info">Small Blind: {roundData['smallBlind']}</p>
      <p className="round-info">Big Blind: {roundData['bigBlind']}</p>
      <div className="countdown-container">
        <p className='countdown'>
            Time Left: {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="game-buttons">
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleResume}>Resume</button>
        <button onClick={handleEnd}>End Game</button>
        <button onClick={handleEdit}>Edit Round Length</button>
      </div>
      {edit && <EditPopup onClose={closeEdit} onError={onError}/>}
    </div>
  );
}
