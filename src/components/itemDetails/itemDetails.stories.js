import React from 'react';
import { ItemDetails } from './itemDetails';
import Box from '@mui/material/Box';

export default {
  title: 'Application Components',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

const ItemDetailsTemplate = (args) => {
  return (
    <>
      <Box
        sx={{
          margin: '20px',
          width: '50%'
        }}
      >
        <ItemDetails {...args} />
      </Box>
    </>
  );
};

const toDoItem1 = {
  todoId: '3333',
  title: 'Item title',
  details: 'Test title',
  dueDate: '25-03-2022',
  status: 'I',
};

export const ItemDetailsView = ItemDetailsTemplate.bind({});
ItemDetailsView.args = {
  todoItem: toDoItem1,
  readOnly: false
};
