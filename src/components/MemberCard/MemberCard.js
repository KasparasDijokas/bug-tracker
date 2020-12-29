import React, { useState, useEffect } from "react";
import styles from "./memberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import { useFirestoreConnect } from "react-redux-firebase";
import {useSelector} from 'react-redux';
import GetCurrentProject from '../../helper/GetCurrentProject';
import { useFirestore } from "react-redux-firebase";

const MemberCard = ({ user }) => {
  console.log(user)
  const currentProject = GetCurrentProject();
  const firestore = useFirestore();

  useFirestoreConnect({
    collection: 'members' 
})

const members = useSelector(state => {
    return state.firestore.data.members;
})

const [memberAssigned, setMemberAssigned] = useState(false);
useEffect(() => {
  if (members[user.projectId].projects) {
    setMemberAssigned(true);
  } else {
    setMemberAssigned(false)
  }
  
}, [])

if (members) {
  console.log(members)
}
const date = new Date(+user.createdAt.seconds * 1000).toDateString();

const assignMemberHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
    .collection('members')
    .doc(user.projectId)
    .update({
      projects: {...user.projects, [currentProject.projectId]: currentProject}
    })
  };

  const removeUserHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
    .collection('members')
    .doc(user.projectId)
    .set({ projects : {
      [currentProject.projectId]: firestore.FieldValue.delete()
    }
    }, { merge: true });
  }

  if (user) {
    return (
      <div className={styles.body__nav}>
        <div className={styles.member__card}>
          <div>
            <img src={userImage} alt="user" />
          </div>
          <div>
            <p className={styles.userName}>{user.userName}</p>
            <p className={styles.userEmail}>{user.userEmail}</p>
          </div>
          <p className={styles.card__text}>{date}</p>
          <p className={styles.card__text}>
            {user.role ? user.role : "not assigned"}
          </p>
          {memberAssigned ? (
            <div className={styles.controls}>
            <i className="far fa-check-circle"></i>
            <span onClick={() => removeUserHandler(user)}>remove</span>
            </div>
          ) : (
            <Button onClick={() => assignMemberHandler(user)} disabled={memberAssigned}>
              Assign to project
            </Button>
          )}
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default MemberCard;
