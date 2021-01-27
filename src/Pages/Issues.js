import React from "react";
import DashboardContainer from "../containers/DashboardContainer";
import { Issues } from "../components";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { Spinner } from "../components";

const IssuesPage = () => {
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
        <div style={{ width: "100%" }}>
          <Issues currentProject={projectsCollection[id]} id={id} />
        </div>
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

export default IssuesPage;
