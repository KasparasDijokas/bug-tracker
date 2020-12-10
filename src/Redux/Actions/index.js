import firebase from "../../Config/firebase";
import * as TYPES from "../../Constants/actions";

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
