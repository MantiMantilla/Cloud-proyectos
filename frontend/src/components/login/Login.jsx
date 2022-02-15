import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correo: email,
        password: password,
      }),
    };

    fetch('http://172.24.41.218:8080/validar_administrador', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        if (data.success === 'true') {
          return navigate(`/home`, { state: data });
        }
      });
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
            onChange={(event) => setEmail(event.target.value)}
            placeholder={'name'}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={'contraseña'}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
