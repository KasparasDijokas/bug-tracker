import firebase from "../../config/firebase";
import * as TYPES from "../../constants/actions";

export const createUser = ({name, email, password, repeatPassword}) => {
    console.log('runinng', name, email);
  return {
    type: TYPES.CREATE_USER,
    payload: {
      name: name,
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    },
  };
};

export const showModal = () => {
  return {
    type: TYPES.SHOW_MODAL,
  }
}
