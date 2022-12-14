import React from 'react';
import PrimarySearchAppBar from './appbar';
import { useThemeMode } from '../../providers/themeProvider';

export default {
  title: 'Application Components',
  component: PrimarySearchAppBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

const Template = (args) => {
  // const [mode, setmode] = useState('light');
  // const Theme = createTheme(getTheme(mode));
  const themeMode = useThemeMode();
  const handleThemeToggle = () => {
    themeMode.toggle();
  };

  return <PrimarySearchAppBar {...args} handleTheme={handleThemeToggle} />;
};

export const AppBar = Template.bind();

// AppBar.args = {
//   handleTheme: handleThemeToggle()
// };
