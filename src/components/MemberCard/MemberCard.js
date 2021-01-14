import React, { useState } from "react";
import styles from "./memberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Spinner } from "../index";
import useCurrentProject from "../../hooks/useCurrentProject";

const MemberCard = ({ user }) => {
  const currentProject = useCurrentProject();
  const firestore = useFirestore();
  const [memberAssigned, setMemberAssigned] = useState(false);
  const { email } = useSelector((state) => state.firebase.auth);

  const date = new Date(+user.createdAt).toDateString();

  // add current project to selected user
  const assignMemberHandler = (user, btnState) => {
    // update selected users 'projects' field with current project
    setMemberAssigned(!memberAssigned);
    firestore
      .collection("members")
      .doc(user.userEmail)
      .update({
        projects: {
          ...user.projects,
          [currentProject.projectId]: currentProject,
        },
      })
      .then(() => {
        firestore
          .collection(`users/${email}/projects`)
          .doc(currentProject.projectId)
          .update({
            members: firestore.FieldValue.arrayUnion({
              email: user.userEmail,
              name: user.userName,
            }),
          });
      });
  };

  // remove current project from selected user
  const removeUserHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
      .collection("members")
      .doc(user.userEmail)
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
          .update({
            members: firestore.FieldValue.arrayRemove({
              email: user.userEmail,
              name: user.userName,
            }),
          });
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
            {!user.projects[currentProject.projectId] ||
            user.projects[currentProject.projectId].userRole.length < 1
              ? `not assigned`
              : user.projects[currentProject.projectId].userRole}
          </p>
          {user.projects[currentProject.projectId] ? (
            <div className={styles.controls}>
              <i className="far fa-check-circle"></i>
              <span onClick={() => removeUserHandler(user)}>remove</span>
            </div>
          ) : (
            <Button onClick={() => assignMemberHandler(user, memberAssigned)}>
              Assign to project
            </Button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }
};

export default MemberCard;
