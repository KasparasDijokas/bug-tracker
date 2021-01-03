import React from "react";
import ProjectSummary from "../components/ProjectSummary/ProjectSummary";
import DashboardContainer from '../containers/DashboardContainer';
import GetCurrentProject from '../helper/GetCurrentProject';

const Overview = (props) => {
  const currentProject = GetCurrentProject();

  if (currentProject) {
    return (
      <div style={{display: 'flex'}}>
        <DashboardContainer/>
        <ProjectSummary currentProject={currentProject} id={currentProject.projectId} />;
      </div>
      ) 
  } else {
    return <div>Please select project (prideti linka i my projects arba visada rodyt pirmaw)</div>;
  }
};

export default Overview;
