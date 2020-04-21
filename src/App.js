import React from "react";

import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./components/ToDoTemplate";
import TodoHead from "./containers/TodoHeadContainer";
import TodoList from "./containers/TodoListContainer";
import TodoCreate from "./containers/TodoCreateContainer";

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
}`;

function App() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}
export default App;
