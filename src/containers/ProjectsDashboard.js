import React, { useState } from "react";
import { Dashboard } from "../components";
import logo from "../images/logo_main.png";
import {useSelector} from 'react-redux';

const DashboardContainer = () => {
  const [openDashboad, setOpenDashboard] = useState(false);
  const {displayName, email} = useSelector(state => state.firebase.auth);

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
        {/* <img src={logo} alt="logo" /> */}
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
      <Dashboard.Link exact to="/signin">
        <span>
        <i className="fas fa-sign-out-alt"></i>
        </span>
        Sign out
      </Dashboard.Link>
    </Dashboard>
  );
};

export default DashboardContainer;

