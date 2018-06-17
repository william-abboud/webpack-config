import "babel-polyfill";
import './styles/style.scss';
import { render } from 'react-dom';
import React from 'react';
import App from './js/app';

render(
  <App />,
  document.getElementById('root')
);