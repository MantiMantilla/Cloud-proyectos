import React from 'react';
import { Redirect, useLocation } from 'react-router';

const Home = () => {
  const location = useLocation();
  const isLogin = location.state.success;
  console.log(location);
  return <h2>home</h2>;
};

export default Home;
