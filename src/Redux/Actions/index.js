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

export const showEmailModal = (project) => {
  return {
    type: TYPES.SHOW_EMAIL_MODAL
  };
};

export const showIssuesModal = (project) => {
  return {
    type: TYPES.SHOW_ISSUES_MODAL
  };
};

export const saveCurrentProject = (project) => {
  return {
    type: TYPES.SAVE_CURRENT_PROJECT,
    payload: {
      ...project
    }
  }
}