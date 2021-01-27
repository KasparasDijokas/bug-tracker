import React from "react";
import ProjectSummary from "../components/ProjectSummary/ProjectSummary";
import DashboardContainer from "../containers/DashboardContainer";
import { Spinner } from "../components";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";

const Overview = (props) => {
  let { id } = useParams();

  useFirestoreConnect({
    collection: `projects`,
    storeAs: "projectsCollection",
  });

  const { projectsCollection } = useSelector((state) => {
    return state.firestore.data;
  });

  if (projectsCollection) {
    return (
      <div style={{ display: "flex" }}>
        <DashboardContainer id={id} />
        <ProjectSummary currentProject={projectsCollection[id]} id={id} />
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

export default Overview;
