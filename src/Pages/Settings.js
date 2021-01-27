import React from "react";
import { SettingsComponent } from "../components";
import ProjectsDashboard from "../containers/ProjectsDashboard";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useParams } from "react-router-dom";

const Settings = () => {
  let { id } = useParams();

  const { createdAt, lastLoginAt } = useSelector((state) => {
    return state.firebase.auth;
  });

  // data conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  useFirestoreConnect({
    collection: `projects`,
    storeAs: "allProjects",
  });

  const { allProjects } = useSelector((state) => {
    return state.firestore.data;
  });

  return (
    <div style={{ display: "flex" }}>
      <ProjectsDashboard id={id} />
      <SettingsComponent projects={allProjects} />
    </div>
  );
};

export default Settings;
