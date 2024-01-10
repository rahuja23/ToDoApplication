import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { Flush } from './components/Flush'

function App() {
  const [todos, setTodos]= useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTodos(data.todos); // Assuming the response data is the array of todos
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, [todos]);

  return (
    <div>
      <CreateTodo/>
      <Todos todos={todos} ></Todos>
      <Flush></Flush>
    </div>
  )
}

export default App
