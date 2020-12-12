import React, {useState} from 'react';
import * as TYPES from '../../constants/actions';
import firebase from '../../config/firebase';
import {combineReducers} from 'redux';

 const authReducer = (state = {}, action) => {
  switch(action.type) {
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
        // console.log(showModalState);
        return showModalState;
    } 

    return state;
}

const reducers = combineReducers({
    authReducer,
    showModalReducer
})

export default reducers;
