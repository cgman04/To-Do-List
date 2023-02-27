import React, { useState } from 'react';
import "./App.css";

function App() {
  /*const [Todo, setTodo] = useState(""); is equivalent to:
  const TodoStateArr = useState("");
  const Todo = TodoStateArr[0];
  const setTodo = TodoStateArr[1];
  */
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  // prevent form from refreshing page
  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (Todo.length === 0) {
      return;
    }

    // makes it so that our todos are objects instead of strings
    const todoItem = {
      text: Todo,
      complete: false
    }

    //(setTodos) pass in brand new array containing all current todos(Todos) and new todo (Todo)
    setTodos([...Todos, todoItem]);
    // to clear State in console, type: 
    setTodo("");
  }

  return (
    <div className='mt-3' style={{ textAlign: 'center' }}>
      <h1 className='mb-3'>To-Do List</h1>
      <form onSubmit={(event) => {
        handleNewTodoSubmit(event);
      }}>
        <input onChange={(event) => {
          setTodo(event.target.value);
        }} type="text" value={Todo}/> 
        {/* to clear input box on front end, we connect the value of the input box to the State (Todo) */}
        <div className='mt-2'>
          <button className='btn btn-primary'>Add</button>
        </div>
      </form>

      <hr/>

{/* to display a list of Todos, we have to map Todo items into the items in the div */}
      {
        Todos.map((todo, index) => {
          const todoItems = ['items'];
          if (todo.complete) {
            todoItems.push("crossed-out");
          }
          return (
            <div key={index} className='m-2'>
              {/* must connect state of check box to todos completed state */}
              <input onChange={(event)=> {
                // to update a todo, we have to map over the todos and update the one we want to update
                setTodos(Todos.map((todo, i) => {
                  if (i === index) {
                    return {
                      ...todo,
                      complete: event.target.checked
                    }
                  }
                  return todo;
                }))
              }} type='checkbox'/>

              <span className={todoItems.join(' ')}>{todo.text}</span>

              <button className='btn btn-danger' onClick={(event)=> {
                // to delete a todo, we have to filter out the todo we want to delete
                setTodos(Todos.filter((todo, i) => {
                  return i !== index;
                }))
              }}>Delete</button>
            </div>
          );
        })}
    </div>
  );
}
export default App;
