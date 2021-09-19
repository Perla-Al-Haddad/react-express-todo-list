import {React, useState, useEffect} from 'react'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TodoList from './components/TodoList/TodoList'

import './App.css'

const App = () => {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks');
      const responseData = await response.json();
      setTaskList(responseData.tasks);
    };
    fetchTasks();
  }, []);

  const addTaskHandler = async (taskText) => {
    try {
      const task = {
        text: taskText
      }
      let hasError = false
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      if (!response.ok) {
        hasError = true
      }
      const responseData = await response.json()
      if (hasError) {
        throw Error(responseData.message)
      }
      setTaskList((prevTasks) => {
        return prevTasks.concat(responseData.task)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (id) => {
    await fetch("http://localhost:5000/tasks/" + id, {method: "DELETE"})
    window.location.reload(true);
  }
  
  if (taskList.length === 0) {
    return (        
      <main className="title">
          <h1>Todo List</h1>
          <NewTaskForm addTaskHandler={addTaskHandler}/>
          <h2>No more Tasks!</h2>
      </main>
    )
  }

  return (
    <main className="title">
      <h1>Todo List</h1>
      <NewTaskForm addTaskHandler={addTaskHandler}/>
      <TodoList onRemoveHandler={handleRemove} tasks={taskList} />
    </main> 
  )
}

export default App