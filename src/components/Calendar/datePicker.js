import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { useAppContext } from '../../providers/appContextProvider';
import moment from 'moment';

export default function ResponsiveDatePickers() {
  const [value, setValue] = React.useState(new Date());
  const AppContext = useAppContext();

  const handleDateChange = (newValue) => {
    let tempVal = newValue;
    if (tempVal) {
      const dateVal =  moment(tempVal).format("YYYY-MM-DD");
      AppContext.updateDueDate(dateVal);
    }
  };

  React.useEffect(() => {
    handleDateChange(value);
  }, [value]);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Date"
        value={value}
        minDate={new Date('2017-01-01')}
        disableCloseOnSelect
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
