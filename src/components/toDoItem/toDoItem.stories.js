import { ItemCard, EmptyItemAdd } from './toDoItem';
import Box from '@mui/material/Box';

export default {
  title: 'Application Components',
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
};

const EmptyItemAddTemplate = (args) => {
  return (
    <>
      <Box sx={{ margin: '20px' }}>
        <EmptyItemAdd {...args} />
      </Box>
    </>
  );
};

const ItemCardTemplate = (args) => {
  return (
    <>
      <Box sx={{ margin: '20px' }}>
        <ItemCard {...args} />
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

export const EmptyItemAddCard = EmptyItemAddTemplate.bind({});

export const DefaultItemCard = ItemCardTemplate.bind({});
DefaultItemCard.args = { todoItem: toDoItem1 };
