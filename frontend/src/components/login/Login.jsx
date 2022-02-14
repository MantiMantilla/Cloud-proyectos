import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example' }),
  };

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' }),
    };

    fetch('http://172.24.41.218:8080/validar_administrador', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
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
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
