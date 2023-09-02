import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoItem({ todo, onRemove }) {
  return (
    <li>
      {todo.text}
      <button onClick={() => onRemove(todo._id)}>Remove</button>
    </li>
  );
}


function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showTasks, setShowTasks] = useState(true); // Initially show tasks

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (inputValue) {
      try {
        const response = await axios.post("http://localhost:5000/api/todos", {
          text: inputValue,
        });
        setTodos([...todos, response.data]);
        setInputValue("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const removeTodo = async (id) => {
    try {
      // Display an alert message before removing the todo
      const confirmDelete = window.confirm("Are you sure you want to remove this task?");
      
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/todos/${id}`);
        // After successful deletion, re-fetch the updated list of todos
        fetchTodos();
      }
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };
  
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <button onClick={() => setShowTasks(!showTasks)}>
        {showTasks ? "Hide Tasks" : "View Tasks"}
      </button>

      {showTasks && todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onRemove={removeTodo} />
          ))}
        </ul>
      ) : (
        <p>{showTasks ? "No tasks available." : ""}</p>
      )}
    </div>
  );
}

export default TodoList;