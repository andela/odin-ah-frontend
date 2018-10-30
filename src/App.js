import React from 'react';
import logo from './logo.svg';
import './App.css';
import Todos from './components/Todos.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p className='test'>
          Authors Haven react base template
        </p>
        <Todos/>
      </header>
    </div>
  );
}

export default App;
