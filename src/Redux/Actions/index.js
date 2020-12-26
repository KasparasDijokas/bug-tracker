import * as TYPES from "../../constants/actions";

export const createUser = (user) => {
  return {
    type: TYPES.CREATE_USER,
    payload: {
      name: user.displayName,
      email: user.email,
      password: user.password,
    },
  };
};

export const showModal = (project) => {
  return {
    type: TYPES.SHOW_MODAL
  };
};

export const saveCurrentProject = (project) => {
  // console.log(project);
  return {
    type: TYPES.SAVE_CURRENT_PROJECT,
    payload: {
      ...project
    }
  }
}