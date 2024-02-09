import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    loading: false,
    error: false,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getTodosStart: (state) => {
            state.loading = true;
        },
        getTodosSuccess: (state, action) => {
            state.todos = action.payload;
            state.loading = false;
            state.error = false;
        },
        getTodosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addTodoStart: (state) => {
            state.loading = true;
        },
        addTodoSuccess: (state, action) => {
            state.todos.push(action.payload);
            state.loading = false;
            state.error = false;
        },
        addTodoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTodoStart: (state) => {
            state.loading = true;
        },
        deleteTodoSuccess: (state, action) => {
            state.todos = state.todos.filter((todo) => todo._id !== action.payload);
            state.loading = false;
            state.error = false;
        },
        deleteTodoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTodoStart: (state) => {
            state.loading = true;
        },
        updateTodoSuccess: (state, action) => {
            state.todos = state.todos.map((todo) => todo._id === action.payload._id ? action.payload : todo);
            state.loading = false;
            state.error = false;
        },
        updateTodoFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getTodosStart,
    getTodosSuccess,
    getTodosFailure,
    addTodoStart,
    addTodoSuccess,
    addTodoFailure,
    deleteTodoStart,
    deleteTodoSuccess,
    deleteTodoFailure,
    updateTodoStart,
    updateTodoSuccess,
    updateTodoFailure,
} = todoSlice.actions;

export default todoSlice.reducer;