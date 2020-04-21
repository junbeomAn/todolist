import axios from "axios";

export function createPostAPI(post) {
  return axios.post("/todos", post);
}
export function getPostsAPI() {
  return axios.get("/todos");
}
export function markPostDoneAPI({ id, done }) {
  return axios.patch(`/todos/${id}`, { done });
}
export function deletePostAPI(id) {
  return axios.delete(`/todos/${id}`);
}
