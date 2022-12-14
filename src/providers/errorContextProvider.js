import { Button, Container, Paper, Typography } from '@mui/material';
import { createContext, useContext, useEffect,   useState } from 'react';
const Context = createContext({});

const ErrorContextProvider = ({ children }) => {
  const [appError,setAppError] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
 
    const clearError=()=>{
        setAppError(false);
        setErrorMsg("");
    }
  const value = {
    appError,
    setAppError,
    errorMsg,
    setErrorMsg,
    clearError
  };

  return (
    <Context.Provider value={value}>
      {appError && (
        <Paper
          square
          sx={{
            borderBottom: "4px solid",
            borderBottomColor: "error.main",
          }}
        >
          <Container
            sx={{
              padding: "8px 0px 0px 0px",
            }}
          >
               <Typography>
                   {errorMsg}
               </Typography>
               <Button onClick={clearError}>
                   Clear
               </Button>
          </Container>
        </Paper>
      )}

      {children}      
    </Context.Provider>);
};

const useErrContext = () => useContext(Context);

export { ErrorContextProvider, useErrContext};
