import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { useContext } from 'react';

const CreateContest = () => {
  const { userId, setUserId } = useContext(Context);
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [recomendations, setRecomendations] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [valorPremio, setValorPremio] = useState('');
  const [script, setScript] = useState('');
  const [banner, setBanner] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_admin: `${userId}`,
        nombre: name,
        path_banner: banner,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        valor_premio: valorPremio,
        guion: script,
        recomendaciones: recomendations,
        url: url,
      }),
    };

    fetch('http://172.24.41.218:8080/concursos', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Concurso creado exitosamente.') {
          return navigate(`/home`);
        }
      });
  };

  return (
    <div style={{ padding: 70 }}>
      <h2>Crear Concurso</h2>
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
          Fecha inicio
          <input
            type="text"
            value={fechaInicio}
            onChange={(event) => setFechaInicio(event.target.value)}
            placeholder={'dd/MM/YYY'}
          />
          Fecha fin
          <input
            type="text"
            value={fechaFin}
            onChange={(event) => setFechaFin(event.target.value)}
            placeholder={'dd/MM/YYY'}
          />
          Valor premio
          <input
            type="text"
            value={valorPremio}
            onChange={(event) => setValorPremio(event.target.value)}
            placeholder={'valor Premio'}
          />
          Guion
          <input
            type="text"
            value={script}
            onChange={(event) => setScript(event.target.value)}
            placeholder={'guion'}
          />
          Recomendaciones
          <input
            type="text"
            value={recomendations}
            onChange={(event) => setRecomendations(event.target.value)}
            placeholder={'recomendaciones'}
          />
          Imagen
          <input
            type="text"
            value={banner}
            onChange={(event) => setBanner(event.target.value)}
            placeholder={'Banner'}
          />
          URL
          <input
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={'url'}
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
