import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todos } from './components/Todos.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Authors Haven react base template</p>
          <Todos />
          <p
          className='test'> TESTING SASS
          </p>
        </header>
      </div>
    );
  }
}

export default App;
