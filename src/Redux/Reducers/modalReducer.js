import * as TYPES from "../../constants/actions";

const modalReducer = (state = false, action) => {
  if (action.type === TYPES.SHOW_MODAL) {
    return !state;
  }
  return state;
};

export default modalReducer;
