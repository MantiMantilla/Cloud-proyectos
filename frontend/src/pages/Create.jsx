import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateContest = () => {
  let navigate = useNavigate();
  const [name, setName] = useState('');
  const [recomendations, setRecomendations] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [valorPremio, setValorPremio] = useState('');
  const [script, setScript] = useState('');
  const [banner, setBanner] = useState('');

  const handleSubmit = () => {
    return navigate(`/home`);
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
            type="date"
            value={fechaInicio}
            onChange={(event) => setFechaInicio(event.target.value)}
            placeholder={'fecha Inicio'}
          />
          Fecha fin
          <input
            type="date"
            value={fechaFin}
            onChange={(event) => setFechaFin(event.target.value)}
            placeholder={'fecha Fin'}
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
