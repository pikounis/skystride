import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent'; 
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    dark: false, // set to true for dark mode
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
    
  );
}

export default App;
