import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import store from './store';

interface AppProps {}

function App({}: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <main className="app">
            <NavBar />
            <div className="content">
              <Routes />
            </div>
          </main>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
