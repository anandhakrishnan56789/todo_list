// src/App.js
import React, { useState } from "react";
import TodoList from "./todo list";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoList />
    </div>
  );
}

export default App;
