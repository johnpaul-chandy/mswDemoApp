import { createTheme } from '@mui/material/styles';
import { teal, grey, deepOrange } from '@mui/material/colors';

export const handleTheme = function (appMode, setmode) {
  if (appMode === 'light') {
    setmode('dark');
  } else {
    setmode('light');
  }
};

export const getTheme = (mode) => {
  return createTheme(getThemePalette(mode));
};

const getThemePalette = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: teal,
          divider: teal[200],
          text: {
            primary: grey[900],
            secondary: grey[800]
          }
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: '#e1f5fe',
          text: {
            primary: '#fff',
            secondary: '#0ff'
          },
          background: {
            default: grey[700],
            paper: grey[900]
          }
        })
  }
});
