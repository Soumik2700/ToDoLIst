// src/Task.js
import React from 'react';

const Task = ({ task, removeTask, toggleCompletion }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <span onClick={toggleCompletion}>{task.text}</span>
      <button onClick={removeTask}>Remove</button>
    </li>
  );
};

export default Task;
