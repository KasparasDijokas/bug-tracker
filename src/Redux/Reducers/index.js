import { combineReducers } from "redux";
import modalReducer from './modalReducer';
import emailModalReducer from './emailModalReducer';
import issuesModalReducer from './issuesModalReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'; 


export const rootReducer = combineReducers({
  firestore: firestoreReducer, 
  firebase: firebaseReducer,
  modal: modalReducer,
  emailModal: emailModalReducer,
  issuesModal: issuesModalReducer
});

