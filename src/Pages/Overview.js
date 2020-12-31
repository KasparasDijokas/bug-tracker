import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import ProjectSummary from "../components/ProjectSummary/ProjectSummary";
import DashboardContainer from '../containers/DashboardContainer';
import GetCurrentProject from '../helper/GetCurrentProject';

const Overview = (props) => {
  GetCurrentProject();
  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  useFirestoreConnect({
    collection: `users/${email}/projects/`,
    storeAs: "projects",
  });
  useFirestoreConnect({
    collection: `users` 
  });

  const users = useSelector((state) => {
    return state.firestore.data.users;
  });
  const projects = useSelector((state) => {
    return state.firestore.data.projects;
  });

  // Sukurti helper funkcija kurioje bus visa sita logika ir grazins reikiama project ?

  let currentProject = null;
  let currentProjectId = null;
  if (users) {
    currentProjectId = users[email].id;
  }

  if (projects) {
    currentProject = projects[currentProjectId];
  }

  console.log(currentProject);

  if (currentProject) {
    return (
      <div style={{display: 'flex'}}>
        <DashboardContainer/>
        <ProjectSummary currentProject={currentProject} id={currentProjectId} />;
      </div>
      ) 
  } else {
    return <div>Please select project (prideti linka i my projects arba visada rodyt pirmaw)</div>;
  }
};

export default Overview;
