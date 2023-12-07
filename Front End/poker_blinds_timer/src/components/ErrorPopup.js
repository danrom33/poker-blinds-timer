import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="error-popup-container">
      <div className="error-popup">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <div className="error-header">
          <div className="error-icon">!</div>
          <h2>Error</h2>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
