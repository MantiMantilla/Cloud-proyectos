import logo from './logo.svg';
import LoginSignin from './pages/LoginSignin';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateContest from './pages/Create';
import React, { createContext, useState } from 'react';
import Landing from './pages/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { ListaVoces } from './pages/ListaVoces';

export const Context = createContext({});

function App() {
  const [userId, setUserId] = useState();
  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={{ userId: userId, setUserId: setUserId }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createContest" element={<CreateContest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Register />} />
            <Route path="/voces" element={<ListaVoces />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
