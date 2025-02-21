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
  date: Date;
  content: string;
  isDone: boolean;
}

interface NewTodoPayload {
  date: Date;
  content: string;
  isDone: boolean;
}

interface UpdatedTodoPayload {
  updateTodoId: string;
  newTodoContent: string;
}

interface CalendarState {
  todos: Todo[];
  TodoIdInEdit: string | null;
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [{
      id: "1",
      date: new Date("2025/1/1"),
      content: "Example Todo 1",
      isDone: false,
    }],
    TodoIdInEdit: null,
  } as CalendarState,
  reducers: {
    createTodo: (state, action: PayloadAction<NewTodoPayload>)=>{ 
      const newTodo: NewTodoPayload = action.payload;
      const newTodoId = uuidv4();
      state.todos = [...state.todos, {...newTodo, id: newTodoId} as Todo];
      state.TodoIdInEdit = newTodoId;
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
  },
})

// Action creators are generated for each case reducer function
export const { createTodo, removeTodo, todoDone, todoUndone, updateTodoContent,moveToEditStatus, deleteTodo} = todoSlice.actions

export default todoSlice.reducer