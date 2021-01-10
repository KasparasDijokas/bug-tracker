import React, { useState, useEffect } from "react";
import DashboardContainer from "../containers/DashboardContainer";
import { Issues } from "../components";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const IssuesPage = () => {
  const [data, setData] = useState();

  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  useFirestoreConnect({
    collection: `users`,
    storeAs: "users",
  });

  useFirestoreConnect({
    collection: `users/${email}/projects`,
    storeAs: "projects",
  });
  const { projects, users } = useSelector((state) => {
    return state.firestore.data;
  });

  let currentProject = null;
  if (projects && users && email) {
    currentProject = projects[users[email].id];
  }

  useEffect(() => {
    setData(currentProject);
  }, [currentProject]);

  if (data) {
    return (
      <div style={{ display: "flex" }}>
        <DashboardContainer />
        <div style={{ width: "100%" }}>
          <Issues currentProject={data}/>
        </div>
      </div>
    );
  } else {
    return <div>...loading</div>;
  }
};

export default IssuesPage;
