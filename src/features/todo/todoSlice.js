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

/*
Burada select Todo stateden state.todo objesinin icindekileri donuyor
statein bir parcasini yani
ama bizim ekrana basarken eger bir filtre secilmisse
todolar arasindan filtrelenmis olan bir kismini basmamiz gerekiyor
const { todo: { todos, filter } } = state;
bunu yaptigimizda statede tuttugumuz butun todolari(todos) ve filtremizi("ALL", "COMPLETED" veya "ACTIVE")
aliyoruz elimize
sonra selectora dondugumuz deger state.todo icindeki hersey 
+ 
todos'un filtrelenmis hali bakiniz getFiltered
*/
export const selectTodo = state => {
    const { todo: { todos, filter } } = state;
    return { ...state.todo, filtered: getFiltered(todos, filter) }
}
// yukarıda ekledğini çekiyor değil mi

// degisken degil kanka objenin bir propertysi
// degisken gibi dusunebilirsin ama 
// console log'a baktin mi
/*

{todos: Array(3), filter: "ACTIVE", filtered: Array(1)}

filter: "ACTIVE"               filter aktifler

filtered: Array(1)             filtered sadece aktif olanlar (getFiltereddan gelenler)
0: {id: "8oSHRT3xq8pqHbI3mazGc", text: "asdasd", completed: false}

todos: Array(3)                todos da butun hepsi
0: {id: "8oSHRT3xq8pqHbI3mazGc", text: "asdasd", completed: false}
1: {id: "PuggSnHGPWei5YRQCeM9X", text: "qwewq", completed: true}
2: {id: "Z3SUETc0Bira-iiBVye0Z", text: "qweqw", completed: true}
*/

/* 
sen bir butona bastiginda sadece statede tuttugun 'filter' propertysi degisiyor
getFiltered da ona gore filtreledigi icin aslinda filteredi degistirmis oluyosun
*/
export default todoSlice.reducer;