import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-loading-promise-middleware";

import reducers from "./reducers";

const middleware = applyMiddleware(thunk, promise);

export default createStore(reducers, middleware);
