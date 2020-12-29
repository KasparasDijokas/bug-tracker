import React from "react";
import { Members } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import { useFirestoreConnect } from "react-redux-firebase";
import {useSelector} from 'react-redux';

const MembersPage = () => {
    useFirestoreConnect({
        collection: 'members' 
    })
    const members = useSelector(state => {
        return state.firestore.data.members;
    })

  return (
    <div style={{ display: "flex" }}>
      <DashboardContainer />
      <Members members={members}/>
    </div>
  );
};

export default MembersPage;
