import React from "react";
import { MembersRoles } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import { useFirestoreConnect } from "react-redux-firebase";
import {useSelector} from 'react-redux';
import getCurrentProject from '../helper/GetCurrentProject';

const RolesPage = () => {
    const currentProject = getCurrentProject();
    // const {email} = useSelector(state => state.firebase.auth);
    // useFirestoreConnect({
    //     collection: `users/${email}/projects`,
    //     storeAs: 'projects' 
    // })
    // const projects = useSelector(state => {
    //     return state.firestore.data.projects;
    // })

if (currentProject) {
  console.log(currentProject.members);
  return (
    <div style={{ display: "flex" }}>
      <DashboardContainer />
      <MembersRoles currentProjectMembers={currentProject.members}/>
    </div>
  );
} else {
  return <div>...loading</div>
}

};

export default RolesPage;
