import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Routes from './components/routes/Routes';
import './App.scss';
import NavBarContainer from './components/header/NavBarContainer';

function App() {
  return (
      <Fragment>
         <NavBarContainer/>
        <Route component={ Routes } />
      </Fragment>
  );
}

export default App;
