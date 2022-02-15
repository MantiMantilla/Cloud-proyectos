import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Concurso from '../components/concurso/Concurso';
import { useNavigate, Navigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.state.success;
  console.log(location);

  const [listContests, setListContests] = useState([]);

  useEffect(() => {
    fetch('http://172.24.41.218:8080/concursos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListContests(data);
      });
  }, []);

  const handleCrearConcursoClick = () => {
    return navigate(`/createContest`);
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Concursos</h2>
      <div>
        {listContests.map((contest, index) => {
          console.log(contest);
          return (
            <div key={contest.id}>
              <Concurso
                nombre={contest.nombre}
                recomendaciones={contest.recomendaciones}
                guion={contest.guion}
                path_banner={contest.path_banner}
                fecha_inicio={contest.fecha_inicio}
                fecha_fin={contest.fecha_fin}
                valor_premio={contest.valor_premio}
                url={contest.url}
              />
            </div>
          );
        })}
      </div>
      <button
        style={{ marginTop: 16 }}
        type="button"
        onClick={handleCrearConcursoClick}
      >
        Crear concurso
      </button>
    </div>
  );
};

export default Home;
