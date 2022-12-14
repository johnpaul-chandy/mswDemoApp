
import { StyledEngineProvider } from "@mui/material";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider, QueryClient } from "react-query";
import { AppContextProvider } from '../providers/appContextProvider';
import { ThemeProvider } from '../providers/themeProvider';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, cacheTime: 0 } },
});

const Wrapper = ({ children } ) => {
  return (
    <ThemeProvider>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AppContextProvider>
  </ThemeProvider>
  );
};

const customRender = (ui , options  ) =>
  render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, userEvent };
