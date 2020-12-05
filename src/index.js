import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import rootReducer from "./rootReducer";
//import rootReducer from "./reducers/root"; // or wherever you put it
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
     window.__REDUX_DEVTOOLS_EXTENSION__
     && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
