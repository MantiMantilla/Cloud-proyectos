import React, { useState, useEffect } from 'react';

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeconfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 100,
        width: '50%',
        justifyContent: 'center',
      }}
    >
      <h3>Registro de usuario</h3>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            // outline: '1px solid red',
          }}
        >
          <input
            type="text"
            value={email}
            onChange={handleChangeEmail}
            placeholder={'name'}
          />
          <input
            type="text"
            value={password}
            onChange={handleChangePassword}
            placeholder={'contraseña'}
          />
          <input
            type="text"
            value={password}
            onChange={handleChangeconfirmPassword}
            placeholder={'confirmacion de contraseña'}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
