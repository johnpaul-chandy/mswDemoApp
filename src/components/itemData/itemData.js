import { ItemCard, EmptyItemAdd } from '../toDoItem/toDoItem';
import Box from '@mui/material/Box';
import { useGetToDoItems } from '../../providers/queries';
import { useAppContext } from '../../providers/appContextProvider';
import { useEffect } from 'react';
import dayjs  from 'dayjs';

const ItemData = () => {
  const appContext = useAppContext();
  const { isError, isLoading, isSuccess,  data } = useGetToDoItems(dayjs(appContext.dueDate).format('YYYY-MM-DD'));

  return (
    <>
      {/* {isError && <div>Error...</div> } */}
       {isLoading && <div>Loading...</div>}
      {isSuccess && <Data data={data} />}
    </>
  );
};

const Data = ({ data }) => {
  const appContext = useAppContext();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1
        }}
        data-testid="itemData" 
      >
        <EmptyItemAdd />
        {data?.todoListItems?.length > 0 &&
          data.todoListItems.filter(item=> appContext.filter === item.status ||appContext.filter==='A').map((item) => <ItemCard todoItem={item} key={item.todoId} />)}
      </Box>
    </>
  );
};

export { ItemData };
