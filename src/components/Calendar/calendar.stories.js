import React from 'react';
import DateCalendar from './calendar';
import Box from '@mui/material/Box';
import { ThemeProvider, useThemeMode } from '../../providers/themeProvider';

import { withTheme, withStyles } from '@mui/styles';

//import { styled, withTheme } from "@material-ui/core/styles"

export default {
  title: 'Application Components',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

// export const StyledDateCalendar = styled(withTheme(DateCalendar))(props => ({
//     background: props.theme.palette.background,
//     divider: props.theme.palette.divider,
//     text: props.theme.palette.text,
// }))

const DateCalendarTemplate = (args) => {
  const CalendarWithTheme = withTheme(DateCalendar);
  return (
    <>
      <ThemeProvider>
        <Box sx={{ margin: '20px', width: 300 }}>
          <CalendarWithTheme {...args} />
        </Box>
      </ThemeProvider>
    </>
  );
};

export const DefaultDateCalendar = DateCalendarTemplate.bind({});
