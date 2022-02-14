import React, { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState();
  const [lastname, setLasteName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombres: name,
          apellidos: lastname,
          correo: email,
          password: password,
        }),
      };

      fetch('http://172.24.41.218:8080/administrador', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));
    } else {
      console.log('contraseña no coincide');
    }
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
            onChange={(event) => setName(event.target.value)}
            placeholder={'name'}
          />
          <input
            type="text"
            value={email}
            onChange={(event) => setLasteName(event.target.value)}
            placeholder={'last name'}
          />
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={'email'}
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={'contraseña'}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder={'confirmacion de contraseña'}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
