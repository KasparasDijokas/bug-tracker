import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

const useCurrentProject = (props) => {
  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  useFirestoreConnect({
    collection: `users/${email}/projects/`,
    storeAs: "projects",
  });
  useFirestoreConnect({
    collection: `users`,
  });

  const users = useSelector((state) => {
    return state.firestore.data.users;
  });
  const projects = useSelector((state) => {
    return state.firestore.data.projects;
  });

  let currentProject = null;
  let currentProjectId = null;
  if (users) {
    currentProjectId = users[email].id;
  }

  if (projects) {
    currentProject = projects[currentProjectId];
  }

  return currentProject;
};

export default useCurrentProject;
