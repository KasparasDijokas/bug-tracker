import { combineReducers } from "redux";
import authReducer from './authReducer';
import modalReducer from './modalReducer';
import emailModalReducer from './emailModalReducer';
import issuesModalReducer from './issuesModalReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'; 


export const rootReducer = combineReducers({
  firestore: firestoreReducer, 
  firebase: firebaseReducer,
  auth: authReducer,
  modal: modalReducer,
  emailModal: emailModalReducer,
  issuesModal: issuesModalReducer
});

