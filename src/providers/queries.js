import { useQuery,useMutation,useQueryClient } from 'react-query';
import { useAppContext } from './appContextProvider';
import { v4 as uuid } from "uuid";
import { useErrContext } from './errorContextProvider';

import axios from 'axios';
//import { response } from 'msw';

const api = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "/",
  headers: {
    "Content-type": "application/json"
  }
});

// const axiosClient = ({ ...options }) => {
//   api.defaults.headers.common.Authorization = `Brearer token`;
//   const onSuccess = (response) => response;
//   const onError = (err) => {
//     return err;
//   }
//   return Client(options).then(onSuccess).catch(onError);
// }

const useGetToDoItems = (dueDate) => {
    const errContext = useErrContext();

  return useQuery(
    ['getToDoItemsDate', dueDate],
    async () => {
        let res;
        errContext.clearError();
        //const res = await fetch(`/todolist/${dueDate}`);
      //  try{
          res = await   api.get(`/todolist/${dueDate}`);  
      //  }
      //  catch(err){
      //    console.log(err);
      //   throw new Error(err);
      //  }
        if (res?.status!==200) {
        
          throw new Error(res?.status);
        }
        const data = await res.data;
        return data;      
    },
    {
      enabled: Boolean(dueDate),
      refetchOnMount: false,
      staleTime: Infinity,
      onError: (error) =>
      {
        console.log(error);
        errContext.setAppError(true);
        errContext.setErrorMsg("Fetching todo items failed. Please try again...");
      },
    }
  );
};

const useTodoListItems = () => {
  const errContext = useErrContext();

  return useQuery(['todoListItems'], async () => {
 
    errContext.clearError();
      const res = await fetch(`/todolist`);
      if (!res.ok) {
        throw new Error(res.status);
      }
      const json = await res.json();
      return json;
 
  },
  {
    onError: (error) =>
    {
      console.log(error);
      errContext.setAppError(true);
      errContext.setErrorMsg("Fetching todo items failed. Please try again...");
    },    
  }
  );
};

const useAddItem = ( ) => {
  const queryClient = useQueryClient();
const errContext = useErrContext();

  return useMutation(
    async ({item} ) => {
      
      if(item?.title){
        item = {...item,todoId: uuid()}
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({itemtoAdd:item })
      };

      errContext.clearError();
        const res = await fetch(`/todolist/`,requestOptions);
        const data = await res.json();

        return data;

 
    },
    {
      onSuccess: () => {
        console.log("item added")
        queryClient.invalidateQueries("getToDoItemsDate");
      },
      onError: (error) =>
      {
        console.log(error);
        errContext.setAppError(true);
        errContext.setErrorMsg("Adding todo item failed. Please try again...");
      },
    }
  );
};

const useDeleteItem = ( ) => {
  const queryClient = useQueryClient();
  const errContext = useErrContext();

  return useMutation(
    async ({todoId} ) => {

      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({todoId:todoId })
      };
      errContext.clearError();
        const res = await fetch(`/todolist/${todoId}`,requestOptions);
        const data = await res.json();

        return data;

   
    },
    {
      onSuccess: () => {
        console.log("item deleted")
        queryClient.invalidateQueries("getToDoItemsDate");
      },
      onError: (error) =>
      {
        console.log(error);
        errContext.setAppError(true);
        errContext.setErrorMsg("Deleting todo items failed. Please try again...");
      }      

    }
  );
};

const useUpdateItem = ( ) => {
  const queryClient = useQueryClient();
const errContext = useErrContext();

  return useMutation(
    async ({item} ) => {
 
      const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({itemtoUpdate:item })
      };

      errContext.clearError();
        const res = await fetch(`/todolist/`,requestOptions);
        const data = await res.json();

        return data;

     
    },
    {
      onSuccess: () => {
        console.log("item updated")
        queryClient.invalidateQueries("getToDoItemsDate");
      },
      onError: (error) =>
      {
        console.log(error);
        errContext.setAppError(true);
        errContext.setErrorMsg("Updating todo item failed. Please try again...");
      } 

    }
  );
};

export { useTodoListItems, useGetToDoItems,useAddItem,useDeleteItem,useUpdateItem };
