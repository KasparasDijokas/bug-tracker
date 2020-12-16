import React, { useState } from "react";
import * as TYPES from "../../constants/actions";
import firebase from "../../config/firebase";
import { combineReducers } from "redux";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.CREATE_USER:
      break;
    default:
    //   console.log('default');
  }
  return state;
};

const showModalReducer = (state = false, action) => {
  let showModalState = false;
  if (action.type === TYPES.SHOW_MODAL) {
    showModalState = !state;
    return showModalState;
  }

  return state;
};

const createProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.CREATE_PROJECT:
      return action.payload;

    case TYPES.CREATE_PROJECT.ERROR:
      console.log(action.error);
      break;
    default:
      return state;
  }
};

const syncProjectsReducer = (state = [], action) => {
    if (action.type === TYPES.SYNC_PROJECTS) {
     return action.payload;
    }
  
    return state;
}

const reducers = combineReducers({
  authReducer,
  showModalReducer,
  createProjectReducer,
  projects: syncProjectsReducer
});

export default reducers;
