import { createContext, useContext, useMemo, useEffect, useState } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { teal, grey, deepOrange } from '@mui/material/colors';

const Context = createContext('light');

const ThemeProvider = ({
  children,
  initMode = 'light',
  onChangeMode = () => {},
  cssBaseline = true
}) => {
  const [mode, setMode] = useState(initMode);

  useEffect(() => {
    onChangeMode(mode);
  }, [mode, onChangeMode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggle: () => setMode((type) => (type === 'light' ? 'dark' : 'light'))
    }),
    [mode, setMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
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
                divider: teal[200],
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
      }),
    [mode]
  );

  return (
    <Context.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        {cssBaseline && <CssBaseline />}
        {children}
      </MUIThemeProvider>
    </Context.Provider>
  );
};

const useThemeMode = () => useContext(Context);

export { ThemeProvider, useThemeMode };
