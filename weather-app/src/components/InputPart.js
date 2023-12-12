// src/components/InputPart.js
import React from 'react';

const InputPart = ({ onSearch, onLocationClick, error, pending }) => {
  return (
    <section className="input-part">
      <p className={`info-txt ${error ? 'error' : pending ? 'pending' : ''}`}>
        {error ? error : pending ? 'Getting weather details...' : ''}
      </p>
      <div className="content">
        <input
          type="text"
          spellCheck="false"
          placeholder="Enter city name"
          required
          onKeyUp={(e) => e.key === 'Enter' && onSearch(e.target.value)}
        />
        <div className="separator"></div>
        <button onClick={onLocationClick}>Get Device Location</button>
      </div>
    </section>
  );
};

export default InputPart;
