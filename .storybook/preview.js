import { ThemeProvider, useThemeMode } from '../src/providers/themeProvider';
import { AppContextProvider } from '../src/providers/appContextProvider';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

const { worker } = require("../src/mocks/browser");
worker.start();


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}


export const decorators = [

  (Story) => (
    <ThemeProvider >
      <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        < Story />
        </QueryClientProvider>
      </AppContextProvider>
    </ThemeProvider>
  )

];