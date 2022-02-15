import logo from './logo.svg';
import LoginSignin from './pages/LoginSignin';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateContest from './pages/Create';
import React, { createContext, useState } from 'react';

const Context = createContext({});

function App() {
  const [context, setContext] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={[context, setContext]}>
          <Routes>
            <Route path="/" element={<LoginSignin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createContest" element={<CreateContest />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
