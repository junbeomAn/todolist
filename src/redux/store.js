import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import reducer, { rootSaga } from "./modules";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
export default store;
