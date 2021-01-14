import React from "react";
import ProjectSummary from "../components/ProjectSummary/ProjectSummary";
import DashboardContainer from '../containers/DashboardContainer';
import useCurrentProject from '../hooks/useCurrentProject';
import {Spinner} from '../components';

const Overview = (props) => {
  const currentProject = useCurrentProject();

  if (currentProject) {
    return (
      <div style={{display: 'flex'}}>
        <DashboardContainer/>
        <ProjectSummary currentProject={currentProject} id={currentProject.projectId} />;
      </div>
      ) 
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    )
  }
};

export default Overview;
