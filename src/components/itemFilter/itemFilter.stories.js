import { ItemFilter } from './itemFilter';
import Box from '@mui/material/Box';

export default {
  title: 'Application Components',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};


const ItemFilterTemplate = (args) => {
  return (
    <>
      <Box sx={{ margin: '20px' }}>
        <ItemFilter {...args} />
      </Box>
    </>
  );
};

const toDoItem1 = {
  todoId: '3333',
  title: 'Item title',
  description: 'Test title',
  dueDate: '25-03-2022',
  status: '1',
};

export const ItemFilterComponent = ItemFilterTemplate.bind({});


//DefaultItemCard.args = { todoItem: toDoItem1 };
