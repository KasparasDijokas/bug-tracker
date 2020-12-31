import * as TYPES from "../../constants/actions";

const emailModalReducer = (state = false, action) => {
  switch(action.type) {
    case TYPES.SHOW_EMAIL_MODAL:
      return !state;
    default: 
    return state;
  }
  };

  export default emailModalReducer;