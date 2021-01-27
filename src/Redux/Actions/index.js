import * as TYPES from "../../constants/actions";

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
