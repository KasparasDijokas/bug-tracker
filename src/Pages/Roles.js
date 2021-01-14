import React from "react";
import { MembersRoles } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import useCurrentProject from "../hooks/useCurrentProject";
import { Spinner } from "../components";

const RolesPage = () => {
  const currentProject = useCurrentProject();

  if (currentProject) {
    return (
      <div style={{ display: "flex" }}>
        <DashboardContainer />
        <MembersRoles currentProject={currentProject} />
      </div>
    );
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
    );
  }
};

export default RolesPage;
