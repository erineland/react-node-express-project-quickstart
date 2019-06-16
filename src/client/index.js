import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import styles from './scss/application.scss';
import axios from 'axios';

const axiosInstance = axios;

render(
  <App />,
  document.getElementById('root')
);
