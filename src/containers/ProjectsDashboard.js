import React, { useState } from "react";
import { Dashboard } from "../components";
import firebase from "../config/firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const DashboardContainer = () => {
  const history = useHistory();
  const [openDashboad, setOpenDashboard] = useState(false);
  const user = firebase.auth().currentUser;

  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push(ROUTES.SIGN_IN);
      });
  };

  return (
    <Dashboard show={openDashboad}>
      <Dashboard.Summary onClick={() => setOpenDashboard(!openDashboad)}>
        {!openDashboad ? (
          <i
            onClick={() => setOpenDashboard(!openDashboad)}
            className="fas fa-chevron-right"
          ></i>
        ) : (
          <i
            onClick={() => setOpenDashboard(!openDashboad)}
            className="far fa-times-circle"
          ></i>
        )}
        <h1>{user && user.displayName}</h1>
        <p>{user && user.email}</p>
      </Dashboard.Summary>
      <Dashboard.Link to={ROUTES.PROJECTS}>
        <span>
          <i className="fab fa-buffer"></i>
        </span>
        Projects
      </Dashboard.Link>
      <Dashboard.Route onClick={signOutHandler}>
        <span>
          <i className="fas fa-sign-out-alt"></i>
        </span>
        Sign out
      </Dashboard.Route>
    </Dashboard>
  );
};

export default DashboardContainer;
