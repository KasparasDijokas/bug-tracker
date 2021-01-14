import React from "react";
import { Dashboard } from "../components";
import logo from "../images/logo_main.png";
import useCurrentProject from '../hooks/useCurrentProject';
import {useSelector} from 'react-redux';

const DashboardContainer = () => {
  const currentProject = useCurrentProject();
  const {email} = useSelector(state => state.firebase.auth);

  return (
    <Dashboard>
      <Dashboard.Summary>
        <img src={logo} alt="logo" />
        <h1>{currentProject ? `${currentProject.title} project` : ''}</h1>
        <p>
          <span>{email}</span>
        </p>
      </Dashboard.Summary>
      <Dashboard.Link to="/overview">
        <span>
          <i className="fab fa-buffer"></i>
        </span>
        Project Overview
      </Dashboard.Link>
      <Dashboard.Link to="/members">
        <span>
          <i className="fas fa-users"></i>
        </span>
        Project Members
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

