import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
          backgroundColor: 'lightblue',
        }}
      >
        <h1>VoiceBunny</h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ padding: 20 }}>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signin">Register</Link>
          </div>
        </div>
      </div>

      <div>
        VoiceBunny es una empresa dedicada a conectar empresas con artistas...
      </div>
    </div>
  );
};

export default Landing;
