import { handlers } from "./mocks/handler";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { setLogger } from "react-query";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  userEvent,
  waitFor,
  within
} from "./testUtils/testUtils";
import PrimarySearchAppBar from './components/appbar/appbar';
import Box from '@mui/material/Box';
import MainContainer from './components/container';
import { ItemFilter } from './components/itemFilter/itemFilter';
import { Hidden } from '@mui/material';
import moment from 'moment';
//import {todoListItems} from './mocks/handler';

const server = setupServer(...handlers);

beforeAll(() => {
  setLogger({
    log: () => { },
    warn: () => { },
    error: () => { },
  });
  server.listen();
});
afterAll(() => {
  setLogger(window.console);
  server.close();
});

const Component = ({ url }) => (
  <>
    <Box sx={{ top: 0, position: 'sticky', zIndex: 10 }}>
      <PrimarySearchAppBar />
      <Hidden smDown>
        <Box sx={{ marginTop: "8px" }}>
          <ItemFilter />
        </Box>
      </Hidden>
    </Box>
    <MainContainer />
  </>
);

it("My to do app", async () => {

  render(<Component />);
  // server.use(
  //     rest.get(
  //       "/api/todolist/:date",
  //       (req, res, ctx) => {
  //         return res.once(
  //           ctx.json({
  //             errors: [{ code: "RECALL_LIST_LOADING_FAILED" }],
  //             correlationId: req.headers.get("correlation-id"),
  //           })
  //         );
  //       }
  //     )
  //   );
  expect(await screen.findByText(/My To Do Planner/i)).toBeInTheDocument();
  expect(await screen.findByText(/add/i)).toBeInTheDocument();
  userEvent.click(screen.getByTestId('AddCircleOutlineIcon'));

  expect(
    await screen.findByRole('heading', {
      name: /item details/i
    })
  ).toBeInTheDocument();


  userEvent.type(screen.getByRole('textbox', {
    name: /title/i
  }), "test Title");

  userEvent.type(screen.getByRole('textbox', {
    name: /details/i
  }), "Details");

  userEvent.click(screen.getByRole('button', {
    name: /save/i
  }));

  await waitFor(() => {
    screen.findByText("test Title");
  })

}, 600000);

