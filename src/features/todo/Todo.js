import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    addTodo,
    deleteTodo,
    selectTodo,
    toggleTodo,
    showCompleted,
    showAll,
    showActive
} from "./todoSlice";

export const Todo = () => {
    const todoState = useSelector(selectTodo);
    const { filtered } = todoState;
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState("");

    const onAdd = () => {
        dispatch(addTodo(inputText));
        setInputText('');
    }
    const onDelete = (id) => dispatch(deleteTodo(id));

    return (
        <div style={{
            width: "100%",
        }}>
            <div style={{
                width: "75%",
                display: "flex",
                position: "fixed",
                top: "0"
            }}>
                <input style={{
                    width: "64.9%",
                    height: "4.75vw",
                    border: "solid lightgray 1px",
                    color: "gray",
                    fontSize: "1vw"
                }} onKeyPress={(e) => { if (e.key === 'Enter') { onAdd(); } }} value={inputText} placeholder='Write todo here' onChange={event => setInputText(event.target.value)}></input>

                <button style={{
                    width: "33%",
                    height: "5vw",
                    border: "solid lightgray 1px",
                    backgroundColor: "lightgray",
                    color: "white",
                    fontSize: "1vw"
                }} onClick={onAdd}>Add Todo</button>
            </div>
            <ul style={{
                width: "98.25%",
                backgroundColor: "white",
                marginLeft: "0.1vw",
                marginTop: "5vw",
                height: "70vw",
                padding: "0"
            }}>
                {filtered.map(todo => {
                    return (
                        <li style={{
                            backgroundColor: todo.completed ? "gray" : "white",
                            listStyleType: "none",
                            width: "100%",
                            display: "flex",

                        }}>
                            <p style={{
                                textDecorationLine: todo.completed ? "line-through" : "none",
                                color: todo.completed ? "white" : "gray",
                                width: "89%",
                                textAlign: "left",
                                paddingLeft: "2%"
                            }} onClick={() => dispatch(toggleTodo(todo.id))}> {todo.text} </p>
                            {' '}<p style={{ width: "10%" }} onClick={() => onDelete(todo.id)}>🗑️</p>
                        </li>
                    )
                })}
            </ul>
            <footer style={{
                width: "74.5%",
                position: "fixed",
                bottom: "0",
                marginLeft: "-0.3vw"
            }}>
                <button style={{
                    width: "33%",
                    height: "5vw",
                    padding: "0",
                    border: "solid lightgray 1px",
                    backgroundColor: "lightgray",
                    color: "white",
                    fontSize: "1vw"
                }} onClick={() => dispatch(showAll())}>Show All</button>
                <button style={{
                    width: "33%",
                    height: "5vw",
                    padding: "0",
                    border: "solid lightgray 1px",
                    backgroundColor: "lightgray",
                    color: "white",
                    fontSize: "1vw"
                }} onClick={() => dispatch(showCompleted())}>Show Completed</button>
                <button style={{
                    width: "33%",
                    height: "5vw",
                    padding: "0",
                    border: "solid lightgray 1px",
                    backgroundColor: "lightgray",
                    color: "white",
                    fontSize: "1vw"
                }} onClick={() => dispatch(showActive())}>Show Active</button>
            </footer>
        </div >
    )
}