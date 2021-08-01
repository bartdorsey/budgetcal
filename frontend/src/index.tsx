import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme';
import App from './App';
import './index.css';
import { ThemeProvider } from '@material-ui/core';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App /> 
  </ThemeProvider>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
