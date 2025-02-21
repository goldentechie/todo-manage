/*
import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => state.value += 1,
    decrement: (state) => state.value -= 1,
    incrementByAmount: (state, action) => state.value += action.payload,
  },
})

export const { increment, decrement, incrementByAmount } = todoSlice.actions

export default todoSlice.reducer
*/

/*
todos data schema
[{
  id: number | GUID
  date: Date
  content: string
  isDone: bool
}]
*/

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  date: string;
  content: string;
  isDone: boolean;
}

interface NewTodoPayload {
  date: string;
  content: string;
  isDone: boolean;
}

interface UpdatedTodoPayload {
  updateTodoId: string;
  newTodoContent: string;
}

interface DnDPayload {
  targetTodoId: string;
  toDate: string;
}

interface CalendarState {
  todos: Todo[];
  TodoIdInEdit: string | null;
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [
    {
      date: '2025-01-01T05:00:00.000Z',
      content: 'new todo 1',
      isDone: false,
      id: '5497f648-cd4c-4642-976f-a8a9149f328b'
    },
    {
      date: '2025-01-01T05:00:00.000Z',
      content: 'new todo 2',
      isDone: false,
      id: '2a58daa9-6a08-4760-8d75-057840f5900b'
    },
    {
      date: '2025-01-01T05:00:00.000Z',
      content: 'new todo 3',
      isDone: false,
      id: 'd2dea708-d91b-4a83-add9-2ffd240af606'
    },
    {
      date: '2025-01-02T05:00:00.000Z',
      content: 'new todo 4',
      isDone: false,
      id: 'e341b4fe-5cea-46d0-856a-f1f1f1d10ad9'
    },
    {
      date: '2025-01-02T05:00:00.000Z',
      content: 'new todo 5',
      isDone: false,
      id: '02497c2d-1865-466d-81c2-bd542b0cba41'
    },
    {
      date: '2025-01-02T05:00:00.000Z',
      content: 'new todo 6',
      isDone: false,
      id: 'e1f88deb-8b70-4038-ae27-a7e3c8952ef1'
    },
    {
      date: '2025-01-02T05:00:00.000Z',
      content: 'new todo 7',
      isDone: false,
      id: '51bcf18b-fcaa-4be3-98ca-a1d2b3ff4164'
    }],
    TodoIdInEdit: null,
  } as CalendarState,
  reducers: {
    createTodo: (state, action: PayloadAction<NewTodoPayload>)=>{ 
      const newTodo: NewTodoPayload = action.payload;
      const newTodoId = uuidv4();
      state.todos = [...state.todos, {...newTodo, id: newTodoId} as Todo];
    },
    removeTodo: (state, action: PayloadAction<string>)=>{
      const removeTodoId = action.payload;
      state.todos = [...state.todos.filter(todo=>todo.id !== removeTodoId)];
    },
    todoDone: (state, action)=>{
      const todoDoneId = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === todoDoneId) {
          todo.isDone = true;
        }
        return todo;
      })];
    },
    moveToEditStatus: (state, action) => {
      const TodoIdToMoveToEditStatus = action.payload;
      state.TodoIdInEdit = TodoIdToMoveToEditStatus;
    },
    todoUndone: (state, action)=>{
      const todoDoneId = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === todoDoneId) {
          todo.isDone = false;
        }
        return todo;
      })];
    },
    updateTodoContent: (state, action: PayloadAction<UpdatedTodoPayload>)=>{
      const { updateTodoId, newTodoContent} = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === updateTodoId) {
          todo.content = newTodoContent;
        }
        return todo;
      })];

      state.TodoIdInEdit = null;
    },
    deleteTodo: (state, action) => {
      const deleteTodoId = action.payload;
      state.todos = state.todos.filter(todo=>todo.id !== deleteTodoId);
    },
    dragAndDropTicket: (state, action:PayloadAction<DnDPayload>) => {
      const {targetTodoId, toDate} = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === targetTodoId) {
          todo.date = toDate;
        }
        return todo;
      })];
    }
  },
})

// Action creators are generated for each case reducer function
export const { createTodo, removeTodo, todoDone, todoUndone, updateTodoContent,moveToEditStatus, deleteTodo, dragAndDropTicket} = todoSlice.actions

export default todoSlice.reducer