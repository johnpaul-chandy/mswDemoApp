import { useState, useEffect } from 'react';
// import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { Box } from '@mui/material';
import { useAppContext } from '../../providers/appContextProvider';
import moment from 'moment';

export default function DateCalendar() {
  const [value, setValue] = useState(new Date());
  const AppContext = useAppContext();

  const handleDateChange = (newValue) => {
    let tempVal = newValue;
    if (tempVal) {
      const dateVal = moment(tempVal).format("YYYY-MM-DD");
      AppContext.updateDueDate(dateVal);
    }
  };

  useEffect(() => {
    handleDateChange(value);
  }, [value]);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          allowSameDateSelection={true}
          // shouldDisableDate={false}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
