import * as TYPES from "../../constants/actions";

const createProjectReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.CREATE_PROJECT:
      return [...state, action.payload]

    case TYPES.CREATE_PROJECT.ERROR:
      console.log(action.error);
      break;
      
    default:
      return state;
  }
};

export default createProjectReducer;
