import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/routes/Routes';
import './App.scss';

function App() {
  return (
      <BrowserRouter>
        <Route component={ Routes } />
      </BrowserRouter>
  );
}

export default App;
