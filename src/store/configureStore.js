import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { apiMiddleware } from "redux-api-middleware";
import authJwtExpChecker from "../middelware/authJwtExpChecker";
import authHeaderInjector from "../middelware/authHeaderInjector";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant(),
        logger,
        apiMiddleware,
        authJwtExpChecker,
        authHeaderInjector
      )
    )
  );
}
