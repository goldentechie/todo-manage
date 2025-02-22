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
  poolId: string;
  poolType: "week" | "day" | "month" | "normal";
}

interface NewTodoPayload {
  date: string;
  content: string;
  isDone: boolean;
  poolId: string;
  poolType: "week" | "day" | "month" | "normal";
}

interface UpdatedTodoPayload {
  updateTodoId: string;
  newTodoContent: string;
}

interface DnDPayload {
  targetTodoId: string;
  targetPoolId: string;
  targetPoolType: "week" | "day" | "month" | "normal";
}

interface CalendarState {
  todos: Todo[];
  TodoIdInEdit: string | null;
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
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
      const {targetTodoId, targetPoolId, targetPoolType } = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === targetTodoId) {
          todo.poolId = targetPoolId;
          todo.poolType = targetPoolType;
          if (targetPoolType === "day") todo.date = targetPoolId;
        }
        return todo;
      })];
    }
  },
})

// Action creators are generated for each case reducer function
export const { createTodo, removeTodo, todoDone, todoUndone, updateTodoContent,moveToEditStatus, deleteTodo, dragAndDropTicket} = todoSlice.actions

export default todoSlice.reducer