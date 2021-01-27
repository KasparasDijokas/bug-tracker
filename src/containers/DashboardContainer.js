import React from "react";
import { Dashboard } from "../components";
import logo from "../images/logo_main.png";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import * as ROUTES from "../constants/routes";

const DashboardContainer = ({ id }) => {
  // connect to firestore (all projects)
  useFirestoreConnect({
    collection: `projects`,
    storeAs: "projectsCollection",
  });
  const { projectsCollection } = useSelector((state) => {
    return state.firestore.data;
  });
  const { email } = useSelector((state) => state.firebase.auth);

  return (
    <Dashboard>
      <Dashboard.Summary>
        <img src={logo} alt="logo" />
        <h1>{id ? `${projectsCollection[id].title} project` : ""}</h1>
        <p>
          <span>{email}</span>
        </p>
      </Dashboard.Summary>
      <Dashboard.Link to={`${ROUTES.OVERVIEW}/${id}`}>
        <span>
          <i className="fab fa-buffer"></i>
        </span>
        Project Overview
      </Dashboard.Link>
      <Dashboard.Link to={`${ROUTES.MEMBERS}/${id}`}>
        <span>
          <i className="fas fa-users"></i>
        </span>
        Project Members
      </Dashboard.Link>
      <Dashboard.Link to={`${ROUTES.ROLES}/${id}`}>
        <span>
          <i className="fas fa-user-plus"></i>
        </span>
        Role Assignment
      </Dashboard.Link>
      <Dashboard.Link to={`${ROUTES.ISSUES}/${id}`}>
        <span>
          <i className="fas fa-bug"></i>
        </span>
        Issues
      </Dashboard.Link>
    </Dashboard>
  );
};

export default DashboardContainer;
