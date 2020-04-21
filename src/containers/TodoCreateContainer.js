import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TodoCreate from "../components/TodoCreate";
import * as postActions from "../redux/modules/posts";

const TodoCreateContainer = () => {
  const [open, setOpen] = useState(false);
  const [localOpen, setLocalOpen] = useState(open);
  const [animate, setAnimate] = useState(false);
  const [inputRef, setInputRef] = useState(null);

  const dispatch = useDispatch();

  const onToggle = () => setOpen(!open);

  const createPost = e => {
    e.preventDefault();

    const data = {
      text: inputRef.value,
      done: false
    };
    dispatch(postActions.createPost(data));
    inputRef.current = "";
    setOpen(false);
  };

  useEffect(() => {
    if (localOpen && !open) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 110);
    }
    setLocalOpen(open);
  }, [open, localOpen]);

  return (
    <TodoCreate
      disappear={!open}
      onToggle={onToggle}
      open={open}
      localOpen={localOpen}
      animate={animate}
      setInputRef={setInputRef}
      onSubmit={createPost}
    />
  );
};

export default TodoCreateContainer;
