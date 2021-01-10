import React, { useState, useEffect } from "react";
import styles from "./memberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import GetCurrentProject from "../../helper/GetCurrentProject";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const MemberCard = ({ user }) => {
  const currentProject = GetCurrentProject();
  console.log(currentProject);
  const firestore = useFirestore();
  const [memberAssigned, setMemberAssigned] = useState(false);
  const [role, setRole] = useState(false);
  const { email } = useSelector((state) => state.firebase.auth);

  // check if project is already assigned to a user
  useEffect(() => {
    if (currentProject && user.projects[currentProject.projectId]) {
      setMemberAssigned(true);
      setRole(user.projects[currentProject.projectId].userRole);
    } else {
      setMemberAssigned(false);
      setRole(false);
    }
  }, [user, currentProject]);

  const date = new Date(+user.createdAt).toDateString();

  // add current project to selected user
  const assignMemberHandler = (user) => {
    // update selected users 'projects' field with current project
    setMemberAssigned(!memberAssigned);
    firestore
      .collection("members")
      .doc(email)
      .update({
        projects: {
          ...user.projects,
          [currentProject.projectId]: currentProject,
        },
      })
      .then(() => {
        // update current Project 'members' field with assigned user
        firestore
          .collection("members")
          .doc(email)
          .get()
          .then((doc) => {
            console.log(doc.data());
            firestore
              .collection(`users/${email}/projects`)
              .doc(currentProject.projectId)
              .update({
                members: firestore.FieldValue.arrayUnion(doc.data())
              });
          });
      });
  };

  // remove current project from selected user
  const removeUserHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
      .collection("members")
      .doc(email)
      .set(
        {
          projects: {
            [currentProject.projectId]: firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      )
      .then(() => {
        firestore
          .collection(`users/${email}/projects`)
          .doc(currentProject.projectId)
          .set(
            {
              members: {
                [email]: firestore.FieldValue.delete(),
              },
            },
            { merge: true }
          );
      });
  };

  if (user && currentProject) {
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
            {!role || !user.projects[currentProject.projectId]
              ? "not assigned"
              : user.projects[currentProject.projectId].userRole}
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
