import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Hidden, Typography } from '@mui/material';
// import moment from 'moment';
import dayjs  from 'dayjs';

const initialDateValue = new Date();

function ItemDetails({ todoItem, handleCancel, handleSave, mode = 'DISPLAY', readOnly = true }) {

  // const [readOnly,setReadOnly]=useState(true);
  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData({
      title: "",
      dueDate: initialDateValue,
      status: 'N',
      details: ""
    });
  }, []);

  useEffect(() => {
    const dateVal = todoItem?.dueDate ? todoItem?.dueDate : "";

    if (mode !== 'CREATE') {
      setFormData({
        todoId: todoItem?.todoId,
        title: todoItem?.title,
        dueDate: dateVal || "",
        status: todoItem?.status || 'N',
        details: todoItem?.details,
      });

    } else {
      setFormData({
        //title: todoItem?.title||"",
        dueDate: initialDateValue,
        status: todoItem?.status || 'N',
        // details: todoItem?.details||"",
      });

    }
  }, [todoItem, mode]);

  const handleStatusChange = (event) => {
    setFormData({ ...formData, status: `${event.target.value}` });
  };

  const handleTitleChange = (event) => {
    setFormData({ ...formData, title: `${event.target.value}` });
  };

  const handleDueDateChange = (dateVal) => {
    setFormData({ ...formData, dueDate: `${dateVal}` });
  };

  const handleDetailsChange = (event) => {
    setFormData({ ...formData, details: `${event.target.value}` });
  };

  const [currentDate,setCurrentDate] = useState(null)
   //const currentDate = (formData?.dueDate) ? formData?.dueDate : null
   useEffect(()=>{
    setCurrentDate(dayjs(formData?.dueDate))
   },[formData?.dueDate])

  return (
    <Box component="form" noValidate autoComplete="off" sx={{ width: "auto" }}>
      <Typography variant="h5">
        Item Details
      </Typography>
      <Box
        sx={{
          margin: '4px',
          display: 'grid',
          gridTemplateColumns: 'auto',
          gap: 2
        }}
      >
        {/* <FormControl variant="standard" > */}
        <TextField
          disabled={readOnly}
          sx={{ fontWeight: 'bold' }}
          id="todo_title"
          label="Title"
          value={formData?.title ?? ""}
          onChange={handleTitleChange}
          fullWidth
        />
        {/* </FormControl> */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Hidden smDown>
            <DatePicker
              label="Due Date"
              value={currentDate}
              // inputFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                if(newValue)
                  handleDueDateChange(dayjs(newValue).format('YYYY-MM-DD'));
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={readOnly}
            />
          </Hidden>
          <Hidden smUp>
            <MobileDatePicker
              label="Due Date"
              // inputFormat="dd/MM/yyyy"
              value={currentDate}
              onChange={(newValue) => {
                if(newValue)
                  handleDueDateChange(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={readOnly}
            />
          </Hidden>
        </LocalizationProvider>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData?.status || 'N'}
            label="Status"
            onChange={handleStatusChange}
            disabled={readOnly}
          >
            <MenuItem value={'N'}>Not Started</MenuItem>
            <MenuItem value={'I'}>In Progress</MenuItem>
            <MenuItem value={'D'}>Done</MenuItem>
          </Select>
        </FormControl>
        <TextField
          // sx={{ width: "90%" }}
          id="todo_description"
          label="Details  "
          multiline
          maxRows={10}
          minRows={5}
          value={formData?.details ?? ""}
          onChange={handleDetailsChange}
          fullWidth
          disabled={readOnly}
        />
        <Stack direction="row-reverse" spacing={2}>
          <Button
            variant="contained"
            disabled={readOnly}
            onClick={() => {
              // let dueDateTemp = formData.dueDate;
              // dueDateTemp = new Date(dueDateTemp);
              // const dateVal = moment(formData.dueDate).format("DD-MM-YYYY");
              handleSave(formData);
            }}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export { ItemDetails };
