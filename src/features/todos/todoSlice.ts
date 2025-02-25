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

export type PoolType = "week" | "day" | "month" | "unassigned";

export interface Todo {
  id: string;
  date: Date;
  content: string;
  isDone: boolean;
  poolId: string;
  poolType: PoolType;
  isScheduled: boolean;
}

interface NewTodoPayload {
  date: Date;
  content: string;
  isDone: boolean;
  poolId: string;
  poolType: PoolType;
}

interface UpdatedTodoPayload {
  updateTodoId: string;
  newTodoContent: string;
}

interface DnDPayload {
  targetTodoId: string;
  targetPoolId: string;
  targetPoolType: PoolType;
  targetPoolDate: Date;
}

interface CalendarState {
  todos: Todo[];
  TodoIdInEdit: string | null;
}

interface TodoCheckPayload {
  todoDoneId: string;
  isDone: boolean;
}
interface TodoScheduledPayload {
  todoScheduledId: string;
  isScheduled: boolean;
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: JSON.parse(window.localStorage.getItem("todos")??"[]") as Todo[],
    TodoIdInEdit: null,
  } as CalendarState,
  reducers: {
    createTodo: (state, action: PayloadAction<NewTodoPayload>)=>{ 
      const newTodo: NewTodoPayload = action.payload;
      const newTodoId = uuidv4();
      state.todos = [...state.todos, {...newTodo, id: newTodoId} as Todo];
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<string>)=>{
      const removeTodoId = action.payload;
      state.todos = [...state.todos.filter(todo=>todo.id !== removeTodoId)];
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    todoDone: (state, action:PayloadAction<TodoCheckPayload>)=>{
      const { todoDoneId, isDone } = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === todoDoneId) {
          todo.isDone = isDone;
        }
        return todo;
      })];
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    todoScheduled: (state, action:PayloadAction<TodoScheduledPayload>)=>{
      const { todoScheduledId, isScheduled } = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === todoScheduledId) {
          todo.isScheduled = isScheduled;
        }
        return todo;
      })];
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    moveToEditStatus: (state, action) => {
      const TodoIdToMoveToEditStatus = action.payload;
      state.TodoIdInEdit = TodoIdToMoveToEditStatus;
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
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
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    deleteTodo: (state, action) => {
      const deleteTodoId = action.payload;
      state.todos = state.todos.filter(todo=>todo.id !== deleteTodoId);
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    dragAndDropTicket: (state, action:PayloadAction<DnDPayload>) => {
      const {targetTodoId, targetPoolId, targetPoolType, targetPoolDate } = action.payload;
      state.todos = [...state.todos.map(todo=>{
        if (todo.id === targetTodoId) {
          todo.poolId = targetPoolId;
          todo.poolType = targetPoolType;
          todo.date = targetPoolDate;
        }
        return todo;
      })];
      window.localStorage.setItem("todos", JSON.stringify(state.todos));
    }
  },
})

// Action creators are generated for each case reducer function
export const { createTodo, removeTodo, todoDone, todoScheduled, updateTodoContent,moveToEditStatus, deleteTodo, dragAndDropTicket} = todoSlice.actions

export default todoSlice.reducer