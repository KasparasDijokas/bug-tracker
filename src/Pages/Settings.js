import React from 'react';
import {SettingsComponent} from '../components';
import DashboardContainer from '../containers/DashboardContainer';
import { useSelector } from "react-redux";

const Settings = () => {
    const { createdAt, lastLoginAt } = useSelector(
        (state) => {
          return state.firebase.auth;
        }
      );

       // data conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  const projects = useSelector((state) => {
    return state.firestore.data.projects;
  });

    return (
        <div style={{display: 'flex'}}>
            <DashboardContainer/>
            <SettingsComponent projects={projects}/>
        </div>
    )
}

export default Settings
