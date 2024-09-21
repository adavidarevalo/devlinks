import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#633cff', 
      contrastText: '#ffffff', 
    },
    secondary: {
      main: '#737373', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#333333', 
      secondary: '#888888', 
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});