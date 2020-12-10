import * as TYPES from '../../Constants/actions';
import firebase from '../../Config/firebase';
import {combineReducers} from 'redux';

 const authReducer = (state = {}, action) => {
  switch(action.type) {
      case TYPES.CREATE_USER: 
      break;
      default:
          console.log('default');
  }
  return state;
};

const reducers = combineReducers({
    authReducer
})

export default reducers;
