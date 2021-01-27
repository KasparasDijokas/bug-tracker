import React from "react";
import { MembersRoles } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import { Spinner } from "../components";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const RolesPage = () => {
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
        <MembersRoles currentProject={projectsCollection[id]} id={id} />
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
