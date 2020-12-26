import * as TYPES from "../../constants/actions";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.CREATE_USER:
      return action.payload;
    default:
        return state;
  }
};

export default authReducer;