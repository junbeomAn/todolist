import React from "react";
import styled, { keyframes } from "styled-components";
import TodoItem from "../containers/TodoItemContainer";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  margin: 30px auto;
  border: 3px solid #38d9a94f;
  border-top: 3px solid #38d9a9bf;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: ${rotate} 0.8s ease-in-out infinite;
`;

const Message = styled.div`
  margin: 30px auto;
  text-align: center;
  font-size: 21px;
  color: #49505778;
`;
function TodoList({ data, loading }) {
  return (
    <TodoListBlock>
      {data.map(({ id, ...otherProps }) => (
        <TodoItem key={id} id={id} {...otherProps} />
      ))}
      {loading && <Loader />}
      {!data.length && !loading && <Message>할 일을 추가해 주세요!</Message>}
    </TodoListBlock>
  );
}

export default TodoList;
