import React, { useState, useContext } from 'react';
import { Context } from '../../App';
import { useNavigate } from 'react-router-dom';

const Concurso = ({
  nombre,
  recomendaciones,
  guion,
  url,
  id,
  path_banner,
  fecha_inicio,
  fecha_fin,
  valor_premio,
  setListContests,
  listContests,
}) => {
  let navigate = useNavigate();
  const { userId, setUserId } = useContext(Context);

  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(nombre);
  const [recomendations, setRecomendations] = useState(recomendaciones);
  const [fechaInicio, setFechaInicio] = useState(fecha_inicio);
  const [fechaFin, setFechaFin] = useState(fecha_fin);
  const [valorPremio, setValorPremio] = useState(valor_premio);
  const [script, setScript] = useState(guion);
  const [banner, setBanner] = useState(path_banner);
  const [link, setLink] = useState(url);
  const [voces, setVoces] = useState([]);
  const [showVoces, setShowVoces] = useState(false);

  const handleClickEditar = () => {
    setEditMode((prev) => !prev);
  };

  const handleClickEliminar = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`http://172.24.41.218:8080/concursos/${id}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          const newState = listContests.filter((contest) => contest.id !== id);
          setListContests(newState);
        }
      }
    );
  };
  const handleClickDetalles = () => {
    setShowDetails((prev) => !prev);
  };
  const handleClickListaVoces = () => {
    setShowVoces((prev) => !prev);
    fetch('http://172.24.41.218:8080/voces')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setVoces(data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO
    const requestOptions = {
      method: 'PUT',
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
        url: link,
      }),
    };

    fetch(`http://172.24.41.218:8080/concursos/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'El concurso se edito correctamente') {
          return navigate(`/home`);
        }
      });
  };

  return (
    <div style={{ padding: 4 }}>
      <div>
        {nombre}
        <button
          style={{ marginLeft: 10 }}
          type="button"
          onClick={handleClickEditar}
        >
          editar
        </button>
        <button
          style={{ marginLeft: 10 }}
          type="button"
          onClick={handleClickEliminar}
        >
          eliminar
        </button>
        <button
          style={{ marginLeft: 10 }}
          type="button"
          onClick={handleClickDetalles}
        >
          Ver Detalles
        </button>
        <button
          style={{ marginLeft: 10 }}
          type="button"
          onClick={handleClickListaVoces}
        >
          Lista de voces
        </button>
      </div>
      {showDetails && (
        <div>
          detalles
          <div> Nombre: {nombre} </div>
          <div> imagen: {path_banner} </div>
          <div> fecha inicio: {fecha_inicio} </div>
          <div> fecha fin: {fecha_fin} </div>
          <div> valor premio: {valor_premio} </div>
          <div> guion: {guion} </div>
          <div> link: {url} </div>
        </div>
      )}
      {editMode && (
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
            guion
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
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder={'url'}
            />
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
      {showVoces &&
        voces.map((voz) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
  );
};

export default Concurso;
