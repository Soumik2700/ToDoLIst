// src/ToDo.js
import React, { useState, useEffect } from 'react';
import Task from './Task';
import './ToDo.css';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === 'asc') return a.text.localeCompare(b.text);
    if (sortOrder === 'desc') return b.text.localeCompare(a.text);
    return 0;
  });

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <input 
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <div className="controls">
        <button onClick={() => setSortOrder('asc')}>Sort Asc</button>
        <button onClick={() => setSortOrder('desc')}>Sort Desc</button>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {sortedTasks.map((task, index) => (
          <Task 
            key={index}
            task={task}
            removeTask={() => removeTask(index)}
            toggleCompletion={() => toggleCompletion(index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
