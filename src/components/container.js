import DateCalendar from './Calendar/calendar';
import ResponsiveDatePickers from './Calendar/datePicker';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { Grid, Hidden } from '@mui/material';
import {  useAppContext } from '../providers/appContextProvider';
import { ItemData } from './itemData/itemData';
import { ItemFilter } from './itemFilter/itemFilter';
// import {ErrorBoundary} from 'react-error-boundary'
// import { ErrorFallback } from './ErrorFallBack/errorFallBack';
import  { ErrorContextProvider }  from '../providers/errorContextProvider';

export default function MainContainer() {
  return (
    <>
      <Data />
    </>
  );
}

const Data = () => {
  const { dueDate } = useAppContext();

  return (
    <>
      {/* Date picker for mobile screens */}
      <Box sx={{ margin: '20px', top: 92 }} color={grey[900]}>
        <Hidden smUp>
          <ResponsiveDatePickers />
          <ItemFilter/>
        </Hidden>
      </Box>
      {/*  Items and Calendar      */}
      <Grid container spacing={2}>
        <Grid item sm>
          <Box sx={{ margin: '8px' }}>
            <ErrorContextProvider>
              <ItemData data-testid="itemData" />
            </ErrorContextProvider>

          </Box>
        </Grid>
        <Grid item>
          <Hidden smDown>
            <Box
              sx={{
                width: '340px',
                margin: '8px',
                top: 92,
                position: 'sticky',
                border: 'solid 1px #80cbc4'
              }}
            >
              <DateCalendar />
              {/* <ItemFilter/> */}
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </>
  );
};
