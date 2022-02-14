import React from 'react';
import Register from '../components/register/Register';
import Login from '../components/login/Login';

const LoginSignin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 100,
          width: '50%',
          justifyContent: 'center',
          // outline: '1px solid red',
        }}
      >
        <Login />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 100,
          width: '50%',
          justifyContent: 'center',
        }}
      >
        <Register />
      </div>
    </div>
  );
};

export default LoginSignin;
