import React, { useState } from 'react';
import axios from 'axios';
import './EditPopup.css';

const backendUrl = 'http://localhost:5000';

const EditPopup = ({ onClose, onError }) => {

    const [newLength, setNewLength] = useState('');

    const handleChange = (event) => {
        setNewLength(event.target.value)
    }

    const handleSubmit = () => {
        axios.get(backendUrl + "/edit/" + newLength)
        .then(response => {
            if(response.data == "Success")
                onClose()
            else
                onError(response.data["Error"])
        })
        .catch(error => {
            if (error.code == "ERR_BAD_REQUEST")
                onError("Enter a value for Round Length")
        });
    }


  return (
    <div className="edit-popup-container">
      <div className="edit-popup">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="edit-header">
          <div className="edit-icon">!</div>
          <h2>Edit Round Length</h2>
        </div>
        <p className="edit-text">Please note: this change will only be taken into account from next round</p>
        <form onSubmit={handleSubmit} >
            <label className="edit-text">
                Round Length (minutes):
                <input
                type="number"
                name="newLength"
                value={newLength}
                onChange={handleChange}
                />
            </label>
            <div className="edit-button-container">
                <button type="button" className="edit-button" onClick={handleSubmit}>Confirm Edit</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
