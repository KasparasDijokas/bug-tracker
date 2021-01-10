import React, { useState } from "react";
import { Dashboard } from "../components";
import {useSelector} from 'react-redux';
import firebase from '../config/firebase';
import {useHistory} from 'react-router-dom'

const DashboardContainer = () => {
  const history = useHistory();
  const [openDashboad, setOpenDashboard] = useState(false);
  const {displayName, email} = useSelector(state => state.firebase.auth);

  const signOutHandler = () => {
    firebase.auth().signOut().then(() => {
      history.push('/signin')
    })
  }

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
        <h1>{displayName}</h1>
        <p>
          {email}
        </p>
      </Dashboard.Summary>
      <Dashboard.Link to="/projects">
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

