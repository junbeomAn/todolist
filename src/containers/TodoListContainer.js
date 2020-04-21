import React, { useEffect } from "react";
import TodoList from "../components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/modules/posts";

function TodoListContainer() {
  const { data, loading } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <TodoList data={data} loading={loading} />
    </>
  );
}

export default TodoListContainer;
