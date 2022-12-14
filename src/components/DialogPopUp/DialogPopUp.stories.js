import { useState } from 'react';
import { DialogPopUp } from './DialogPopUp';
import Box from '@mui/material/Box';
import { ItemDetails } from '../itemDetails/itemDetails';
import { Button } from '@mui/material';
export default {
  title: 'Application Components',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

const DialogPopUpTemplate = (args) => {
  const [openDialogue, setOpenDialogue] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpenDialogue(true);
        }}
      >
        Open
      </Button>
      <Box sx={{ margin: '20px' }}>
        <DialogPopUp openDialogue={openDialogue} {...args} />
      </Box>
    </>
  );
};

const ItemDetailsWrapper = ({ data }) => {
  return (
    <>
      <ItemDetails todoItem={data}></ItemDetails>
    </>
  );
};
const toDoItem = {
  todoId: '3333',
  title: 'Item title',
  description: 'Test title',
  dueDate: '25-03-2022',
  status: 'In Progress',
};

export const DialogPopUpView = DialogPopUpTemplate.bind({});
DialogPopUpView.args = {
  openDialogue: false,
  ComponenetToLoad: ItemDetailsWrapper,
  componentData: toDoItem
};
