import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className="app">
          <Header/>
          <div className="content">
            <Routes />
          </div>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
