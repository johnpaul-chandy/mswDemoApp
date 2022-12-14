import React from 'react';
import ResponsiveDatePickers from './datePicker';
import Box from '@mui/material/Box';

export default {
  title: 'Application Components',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

const ResponsiveDatePickersTemplate = (args) => {
  return (
    <>
      <Box sx={{ margin: '20px', width: 300 }}>
        <ResponsiveDatePickers {...args} />
      </Box>
    </>
  );
};

export const DatePicker = ResponsiveDatePickersTemplate.bind({});
