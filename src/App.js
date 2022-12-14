import PrimarySearchAppBar from './components/appbar/appbar';
import Box from '@mui/material/Box';
import MainContainer from './components/container';
import { AppContextProvider } from './providers/appContextProvider';
import { ThemeProvider } from './providers/themeProvider';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ItemFilter } from './components/itemFilter/itemFilter';
import { Hidden } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <Box sx={{ top: 0, position: 'sticky', zIndex: 10 }}>
              <PrimarySearchAppBar />
               <Hidden smDown>
                <Box sx={{marginTop:"8px"}}>
                 <ItemFilter/>
                </Box>
                </Hidden>
            </Box>
            <MainContainer />
          </QueryClientProvider>
        </AppContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
