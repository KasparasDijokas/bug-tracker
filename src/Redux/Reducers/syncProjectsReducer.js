import * as TYPES from "../../constants/actions";

const syncProjectsReducer = (state = [], action) => {
    if (action.type === TYPES.SYNC_PROJECTS) {
     return action.payload;
    }
  
    return state;
}

export default syncProjectsReducer;