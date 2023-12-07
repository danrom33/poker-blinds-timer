// StartScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import the CSS file

const backendUrl = 'http://localhost:5000';

export default function Start({ onGameStart, onError}) {
  const [startingSmallBlind, setStartingSmallBlind] = useState('');
  const [roundLength, setRoundLength] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startingSmallBlind') {
      setStartingSmallBlind(value);
    } else if (name === 'roundLength') {
      setRoundLength(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        backendUrl +
          '/start/small/' +
          startingSmallBlind +
          '/length/' +
          roundLength
      )
      .then((response) => {
        if(response.data["Error"]){
          onError(response.data["Error"])
        }
        else
          onGameStart(response.data);
      })
      .catch((error) => {
        var err_message = ''
        if (error.code === 'ERR_BAD_REQUEST')
          err_message = ('Please ensure you have entered values for both fields');
        else if (error.code === 'ERR_NETWORK')
          err_message = ('Could not connect to the server');
        onError(err_message)
      });
  };

  return (
    <div className="start-screen">
      <h1>Poker Game Setup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Starting Small Blind:
          <input
            type="number"
            name="startingSmallBlind"
            value={startingSmallBlind}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Round Length (minutes):
          <input
            type="number"
            name="roundLength"
            value={roundLength}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}
