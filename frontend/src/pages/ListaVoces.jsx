import React, { useEffect, useState } from 'react';

export const ListaVoces = () => {
  const [voces, setVoces] = useState([]);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [audio, setAudio] = useState();
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    fetch('http://172.24.41.218:8080/voces')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVoces(data);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('file', audio);
    formData.append('nombres', name);
    formData.append('apellidos', lastName);
    formData.append('correo', email);
    formData.append('observaciones', observaciones);
    formData.append('id_concurso', '18');
    formData.append('fecha_creacion', '02/12/2021');

    // TODO
    // const requestOptions = {
    //   method: 'POSt',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     id_concurso: '2',
    //     nombres: name,
    //     apellidos: lastName,
    //     correo: email,
    //     audio: audio,
    //     observaciones: observaciones,
    //   }),
    // };

    fetch(`http://172.24.41.218:8080/voces`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div style={{ padding: 100 }}>
      <h1>ListaVoces</h1>
      <div>
        {voces.map((voz, index) => (
          <div
            key={index}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ padding: 10 }}>{voz.nombres}</div>
            <div style={{ padding: 10 }}> {voz.correo}</div>
            <div style={{ padding: 10 }}>{voz.correo}</div>
            <div style={{ padding: 10 }}> {voz.fecha_creacion}</div>
            <div style={{ padding: 10 }}>
              {' '}
              {voz.estado === 0 ? 'En proceso' : 'Convertida'}
            </div>
            <div style={{ outline: '1pc solid red' }}>
              {/* <audio>
                <source src={audio}></source>
              </audio> */}
            </div>
          </div>
        ))}
      </div>
      manda tu voz
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={'nombre'}
          />
          Apellido
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder={'lastName'}
          />
          Email
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={'email'}
          />
          Audio
          <input
            type="file"
            // value={audio}
            onChange={(event) => {
              setAudio(event.target.files[0]);
              // setIsSelected(true);
            }}
            placeholder={'archivo de audio'}
          />
          Observaciones
          <input
            type="text"
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
            placeholder={'Banner'}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
