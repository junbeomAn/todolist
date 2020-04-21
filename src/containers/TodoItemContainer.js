import React, { useCallback } from "react";
import TodoItem from "./../components/TodoItem";
import { useDispatch } from "react-redux";
import { markPostDone, deletePost } from "../redux/modules/posts";

export default React.memo(function TodoItemContainer(props) {
  const dispatch = useDispatch();

  const deletePostById = id => {
    dispatch(deletePost(id));
  };

  const markTodoDone = useCallback(
    id => {
      const data = {
        id,
        done: true
      };
      dispatch(markPostDone(data));
    },
    [dispatch]
  );

  return (
    <>
      <TodoItem
        markTodoDone={markTodoDone}
        deletePostById={deletePostById}
        {...props}
      />
    </>
  );
});
