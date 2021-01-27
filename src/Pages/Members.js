import React from "react";
import { Members } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spinner } from "../components";

const MembersPage = () => {
  let { id } = useParams();

  // get all members
  useFirestoreConnect({
    collection: `members`,
    storeAs: "members",
  });

  // get currentProject
  useFirestoreConnect({
    collection: `projects`,
    storeAs: "projectsCollection",
  });

  const { members, projectsCollection } = useSelector((state) => {
    return state.firestore.data;
  });

  if (projectsCollection && members) {
    return (
      <div style={{ display: "flex" }}>
        <DashboardContainer id={id} />
        <Members
          members={members}
          currentProject={projectsCollection[id]}
          currentProjectId={id}
        />
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

export default MembersPage;
