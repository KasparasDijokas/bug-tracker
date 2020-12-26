import * as TYPES from "../../constants/actions";

const modalReducer = (state = false, action) => {
  // console.log(action);
    let showModalState = false;
    if (action.type === TYPES.SHOW_MODAL) {
      showModalState = !state;
      return showModalState;
    }
  
    return state;
  };

  export default modalReducer;