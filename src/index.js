import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// redux
import { Provider } from "react-redux";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./config/firebase";
import reduxStore from "./Redux/reduxStore";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

const store = reduxStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
