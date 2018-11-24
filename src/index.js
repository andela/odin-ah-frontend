import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store/store';
import apiRequest from './services/apiRequest';
import { loginUser } from './redux/actions/auth/login';

apiRequest.registerInterceptors(store);
apiRequest.authenticateUser()
  .then((result) => {
    const { profile } = result.data;
    store.dispatch(loginUser({ ...profile }));
  })
  .finally(() => {
    const app = (
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    );

    ReactDOM.render(app, document.getElementById('root'));
  });
