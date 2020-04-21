export const getUndoneNumber = todos => {
  return todos.filter(todo => todo.done === false).length;
};
