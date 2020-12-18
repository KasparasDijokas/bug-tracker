import { combineReducers } from "redux";
import authReducer from './authReducer';
import createProjectReducer from './createProjectReducer';
import modalReducer from './modalReducer';
import syncProjectsReducer from './syncProjectsReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'; 


export const rootReducer = combineReducers({
  firestore: firestoreReducer, 
  firebase: firebaseReducer,
  auth: authReducer,
  modal: modalReducer,
  createProject: createProjectReducer,
  allProjects: syncProjectsReducer,
});

