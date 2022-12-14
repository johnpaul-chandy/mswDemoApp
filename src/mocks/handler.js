import { rest } from 'msw';
import { v4 as uuid } from "uuid";
import moment from 'moment';

debugger
//Standard static data
let todoListItems = [
  {
    todoId: '1111',
    title: 'Item title1',
    details: 'Test title',
    dueDate: moment().format("YYYY-MM-DD"),
    status: 'I',
  },
  {
    todoId: '2222',
    title: 'Item title2',
    details: 'Test title',
    dueDate: moment().add(1, 'days').format("YYYY-MM-DD"),
    status: 'I',
  },
  {
    todoId: '3333',
    title: 'Item title3',
    details: 'Test title',
    dueDate: moment().subtract(1, 'days').format("YYYY-MM-DD"),
    status: 'I',
  },
  {
    todoId: '4444',
    title: 'To do Task4',
    details: 'Test title',
    dueDate: moment().format("YYYY-MM-DD"),
    status: 'D',
  },
  {
    todoId: '5555',
    title: 'To do Task5',
    details: 'Test title',
    dueDate: moment().format("YYYY-MM-DD"),
    status: 'N',
  },
  {
    todoId: '6666',
    title: 'Item title6',
    details: 'Test title',
    dueDate: moment().format("YYYY-MM-DD"),
    status: 'I',
  },
  {
    todoId: '7777',
    title: 'Item title7',
    details: 'Test title',
    dueDate: moment().format("YYYY-MM-DD"),
    status: 'I',
  },
];

export const handlers = [
  // Handles a POST /login request
  rest.post('/', null),
  rest.post('/login', null),
  // Handles a GET /user request
  rest.get('/todolist/', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem('is-authenticated')
    // if (!isAuthenticated) {
    //   // If not authenticated, respond with a 403 error
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: 'Not authorized',
    //     }),
    //   )
    // }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        todoListItems: [...todoListItems]
      })
    );
  }),
  rest.post('/todolist/', (req, res, ctx) => {
    const newItem = req?.body?.itemtoAdd;

    if (newItem?.todoId) {
      todoListItems.push(newItem);
    }
    return res(
      ctx.status(200),
      ctx.json({
        itemAdded: newItem
      })
    );
  }),
  rest.delete('/todolist/:todoId', (req, res, ctx) => {
    const todoId = req.params.todoId;
    let msg = "Record not delted"

    if (todoId) {
      todoListItems = todoListItems.filter(
        (item) => {
          return item.todoId !== todoId
        }
      );
      msg = "Record deleted"
    }
    return res(
      ctx.status(200),
      ctx.json({
        message: msg
      })
    );
  }),
  rest.patch('/todolist/', (req, res, ctx) => {
    const updateItem = req?.body?.itemtoUpdate;

    if (updateItem?.todoId) {
      todoListItems = todoListItems.map(item => {
        if (item.todoId === updateItem?.todoId) {
          return updateItem;
        }
        return item;
      });
    }
    return res(
      ctx.status(200),
      ctx.json({
        itemUpdated: updateItem
      })
    );
  }),
  rest.get('/todolist/:date', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    // const isAuthenticated = sessionStorage.getItem('is-authenticated')
    // if (!isAuthenticated) {
    //   // If not authenticated, respond with a 403 error
    //   return res(
    //     ctx.status(403),
    //     ctx.json({
    //       errorMessage: 'Not authorized',
    //     }),
    //   )
    // }
    // If authenticated, return a mocked user details
    const items = todoListItems.filter((toDoItem) => toDoItem.dueDate === req.params.date);
    return res(
      ctx.status(200),
      ctx.delay(300),
      ctx.json({
        todoListItems: items
      })
    );
  })
];

export { todoListItems }