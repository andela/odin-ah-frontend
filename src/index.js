import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import store from './redux/store/store';
import * as serviceWorker from './serviceWorker';

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
