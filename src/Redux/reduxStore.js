import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './Reducers/index';
import {getFirebase, getFirestore} from "react-redux-firebase";

const reduxStore =  () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(getFirebase, getFirestore))
    )
  )
}

export default reduxStore;