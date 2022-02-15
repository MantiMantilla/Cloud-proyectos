import React, { useState } from 'react';

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
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(nombre);
  const [recomendations, setRecomendations] = useState(recomendaciones);
  const [fechaInicio, setFechaInicio] = useState(fecha_inicio);
  const [fechaFin, setFechaFin] = useState(fecha_fin);
  const [valorPremio, setValorPremio] = useState(valor_premio);
  const [script, setScript] = useState(guion);
  const [banner, setBanner] = useState(path_banner);

  const handleClickEditar = () => {
    setEditMode((prev) => !prev);
  };

  const handleClickEliminar = () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`http://172.24.41.218:8080/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  const handleClickDetalles = () => {
    setShowDetails((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     nombre: email,
    //     password: password,
    //   }),
    // };

    // fetch('http://172.24.41.218:8080/validar_administrador', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data.success);
    //     if (data.success === 'true') {
    //       return navigate(`/home`, { state: data });
    //     }
    //   });
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
        <button style={{ marginLeft: 10 }} type="button">
          eliminar
        </button>
        <button
          style={{ marginLeft: 10 }}
          type="button"
          onClick={handleClickDetalles}
        >
          Ver Detalles
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
            <input type="submit" value="Submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Concurso;
