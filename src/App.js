import React, { useState } from "react";
import Todos from "./components/todos/Todos";
import { TodoContext } from './contexts'
import { defaultTodos } from './defaultTodos'
function App() {
  const [todos, setTodos] = useState(defaultTodos)
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <h1 className="text-center">Todo App</h1>
      <Todos />
    </TodoContext.Provider>

  );
}

export default App;
