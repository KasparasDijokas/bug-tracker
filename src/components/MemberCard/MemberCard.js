import React, { useState, useEffect } from "react";
import styles from "./memberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import GetCurrentProject from "../../helper/GetCurrentProject";
import { useFirestore } from "react-redux-firebase";

const MemberCard = ({ user }) => {  
  const currentProject = GetCurrentProject();
  const firestore = useFirestore();
  const [memberAssigned, setMemberAssigned] = useState(false);

// check if project is already assigned to a user
  useEffect(() => {
    if (currentProject && user.projects[currentProject.projectId]) {
      setMemberAssigned(true);
    } else {
      setMemberAssigned(false);
    }
  }, [currentProject]);

  const date = new Date(+user.createdAt).toDateString();

  // add current project to selected user
  const assignMemberHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
      .collection("members")
      .doc(user.memberId)
      .update({
        projects: {
          ...user.projects,
          [currentProject.projectId]: currentProject,
        },
      });
  };

// remove current project from selected user
  const removeUserHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
      .collection("members")
      .doc(user.memberId)
      .set(
        {
          projects: {
            [currentProject.projectId]: firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      );
  };

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
            <Button
              onClick={() => assignMemberHandler(user)}
              disabled={memberAssigned}
            >
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
