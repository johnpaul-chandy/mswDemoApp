import { handlers } from "./mocks/handler";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { setLogger } from "react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
} from "./testUtils/testUtils";

import App from './App';

const server = setupServer(...handlers);

beforeAll(() => {
  setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
  });
  server.listen();
});
afterAll(() => {
  setLogger(window.console);
  server.close();
});


it('renders learn react link', () => {
  render(<App />);
  expect(screen.getByText(/My To Do Planner/i)).toBeInTheDocument();
  
},60000);
