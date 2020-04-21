import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import posts, { postsSaga } from "./posts";

const reducer = combineReducers({
  posts
});

export function* rootSaga() {
  yield all([postsSaga()]);
}

export default reducer;
