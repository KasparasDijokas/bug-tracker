import React, { useState } from "react";
import styles from "./memberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import { useFirestore } from "react-redux-firebase";
import { Spinner } from "../index";

const MemberCard = ({ user, currentProjectId, currentProject }) => {
  const firestore = useFirestore();
  const [memberAssigned, setMemberAssigned] = useState(false);

  // date conversion
  const date = new Date(+user.createdAt).toDateString();

  // add member to current Project
  const assignMemberHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
      .collection(`projects`)
      .doc(currentProjectId)
      .set(
        {
          members: {
            [`${user.userEmail}`]: `${user.userRole}`,
          },
        },
        { merge: true }
      );
  };

  // remove member from current Project
  const removeUserHandler = (user) => {
    setMemberAssigned(!memberAssigned);
    firestore
      .collection(`projects`)
      .doc(currentProjectId)
      .set(
        {
          members: {
            [`${user.userEmail}`]: firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      );
  };

  if (currentProject) {
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
            {!currentProject.members.hasOwnProperty(user.userEmail) ||
            currentProject.members[user.userEmail] === 'undefined'
              ? "not assigned"
              : currentProject.members[user.userEmail]}
          </p>
          {currentProject.members.hasOwnProperty(user.userEmail) ? (
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
