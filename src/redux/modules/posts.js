import { takeLatest, put, call, delay } from "redux-saga/effects";
import { createAction } from "redux-actions";
import {
  createPostAPI,
  getPostsAPI,
  markPostDoneAPI,
  deletePostAPI
} from "./asyncUtils";

// actions
const CREATE_POST = "CREATE_POST";
const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";
const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_FAILURE = "GET_POST_FAILURE";
const MARK_POST_DONE = "MARK_POST_DONE";
const MARK_POST_DONE_SUCCESS = "MARK_POST_DONE_SUCCESS";
const MARK_POST_DONE_FAILURE = "MARK_POST_DONE_FAILURE";
const DELETE_POST = "DELETE_POST";
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

//action creator
export const createPost = createAction(CREATE_POST); // post
export const createPostSuccess = createAction(CREATE_POST_SUCCESS);
export const createPostFailure = createAction(CREATE_POST_FAILURE);
export const getPosts = createAction(GET_POSTS);
export const getPostsSuccess = createAction(GET_POSTS_SUCCESS);
export const getPostsFailure = createAction(GET_POSTS_FAILURE);
export const markPostDone = createAction(MARK_POST_DONE); // id
export const markPostDoneSuccess = createAction(MARK_POST_DONE_SUCCESS);
export const markPostDoneFailure = createAction(MARK_POST_DONE_FAILURE);
export const deletePost = createAction(DELETE_POST); // id
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
export const deletePostFailure = createAction(DELETE_POST_FAILURE);

const combinedActions = {
  create: {
    api: createPostAPI,
    success: createPostSuccess,
    failure: createPostFailure
  },
  mark: {
    api: markPostDoneAPI,
    success: markPostDoneSuccess,
    failure: markPostDoneFailure
  },
  delete: {
    api: deletePostAPI,
    success: deletePostSuccess,
    failure: deletePostFailure
  }
};

const createSaga = sagaType => {
  return function*(action) {
    const combinedAction = combinedActions[sagaType];
    try {
      yield call(combinedAction.api, action.payload);
      yield put(combinedAction.success());
      if (sagaType === "create") {
        yield put(getPosts());
      }
    } catch (err) {
      yield put(combinedAction.failure(err));
    }
  };
};

// sagas
const createPostSaga = createSaga("create");
const markPostDoneSaga = createSaga("mark");
const deletePostSaga = createSaga("delete");

function* getPostsSaga() {
  try {
    yield delay(500);
    const { data } = yield call(getPostsAPI);
    yield put(getPostsSuccess(data));
  } catch (err) {
    yield put(getPostsFailure(err));
  }
}

//watcher
export function* postsSaga() {
  yield takeLatest(CREATE_POST, createPostSaga);
  yield takeLatest(GET_POSTS, getPostsSaga);
  yield takeLatest(MARK_POST_DONE, markPostDoneSaga);
  yield takeLatest(DELETE_POST, deletePostSaga);
  yield takeLatest(MARK_POST_DONE_SUCCESS, getPostsSaga);
  yield takeLatest(DELETE_POST_SUCCESS, getPostsSaga);
}

const initialState = {
  loading: false,
  data: [],
  err: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
    case GET_POSTS:
      return {
        ...state,
        loading: true
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case CREATE_POST_FAILURE:
    case GET_POSTS_FAILURE:
    case MARK_POST_DONE_FAILURE:
      return {
        ...state,
        err: action.payload
      };
    default:
      return state;
  }
}
