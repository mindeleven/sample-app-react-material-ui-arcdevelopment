import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';
import Header from './ui/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      Pleased to meet you, hope you guess my name.
    </ThemeProvider>
  );
}

export default App;
