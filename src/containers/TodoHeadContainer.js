import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";
import TodoHead from "../components/TodoHead";
import { getUndoneNumber } from "../utils";

moment.locale("ko");

function TodoHeadContainer() {
  const { data } = useSelector(state => state.posts);
  const today = moment().format("LL");
  const day = moment().format("dddd");
  return (
    <TodoHead
      todoCount={data && getUndoneNumber(data)}
      today={today}
      day={day}
    />
  );
}
export default TodoHeadContainer;
