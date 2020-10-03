import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';


export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        filter: 'ALL'
    },
    reducers: {
        addTodo: (state, action) => {
            console.log(action.payload);
            state.todos = [
                ...state.todos, {
                    id: nanoid(),
                    text: action.payload,
                    completed: false
                }
            ]
        },
        deleteTodo: (state, action) => {
            console.log(action);
            state.todos = [
                ...state.todos.filter(todo => todo.id !== action.payload)
            ]
        },
        toggleTodo: (state, { payload }) => {
            const newTodos = state.todos.map(todo => (todo.id === payload ? { ...todo, completed: !todo.completed } : todo));
            state.todos = newTodos;
        },
        showAll: (state, action) => {
            state.filter = 'ALL'
        },
        showCompleted: (state, action) => {
            state.filter = 'COMPLETED'
        },
        showActive: (state, action) => {
            state.filter = 'ACTIVE'
        }
    }
})

export const { addTodo, deleteTodo, toggleTodo, showCompleted, showActive, showAll } = todoSlice.actions;

const getFiltered = (todos, filter) => {
    switch (filter) {
        case 'ACTIVE':
            return todos.filter(todo => !todo.completed);
        case 'COMPLETED':
            return todos.filter(todo => todo.completed);
        default:
            return todos
    }
}

export const selectTodo = state => {
    const { todo: { todos, filter } } = state;
    return { ...state.todo, filtered: getFiltered(todos, filter) }
}

export default todoSlice.reducer;
