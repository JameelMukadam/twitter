import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './components/Router';
import ThemeProvider from './components/ThemeProvider';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
