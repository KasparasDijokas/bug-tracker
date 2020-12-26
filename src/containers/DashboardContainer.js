import React, { useState } from "react";
import { Dashboard } from "../components";
import logo from "../images/logo_main.png";

const DashboardContainer = () => {
  const [openDashboad, setOpenDashboard] = useState(false);

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
        <img src={logo} alt="logo" />
        <h1>Project name (props)</h1>
        <p>
          You are <span>Owner(props)</span>
        </p>
      </Dashboard.Summary>
      <Dashboard.Link to="/overview">
        <span>
          <i className="fab fa-buffer"></i>
        </span>
        Project Overview
      </Dashboard.Link>
      <Dashboard.Link to="/users">
        <span>
          <i className="fas fa-users"></i>
        </span>
        Project Users
      </Dashboard.Link>
      <Dashboard.Link to="/roles">
        <span>
          <i className="fas fa-user-plus"></i>
        </span>
        Role Assignment
      </Dashboard.Link>
      <Dashboard.Link to="/issues">
        <span>
          <i className="fas fa-bug"></i>
        </span>
        Issues
      </Dashboard.Link>
      <Dashboard.Link to="/settings">
        <span>
          <i className="fas fa-cog"></i>
        </span>
        Settings
      </Dashboard.Link>
    </Dashboard>
  );
};

export default DashboardContainer;

