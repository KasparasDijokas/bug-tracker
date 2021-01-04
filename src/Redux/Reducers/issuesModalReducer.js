import * as TYPES from "../../constants/actions";

const issuesModalReducer = (state = false, action) => {
  switch(action.type) {
    case TYPES.SHOW_ISSUES_MODAL:
      return !state;
    default: 
    return state;
  }
  };

  export default issuesModalReducer;