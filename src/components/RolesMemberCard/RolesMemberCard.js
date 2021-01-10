import React, { useState, useEffect } from "react";
import styles from "./rolesMemberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import GetCurrentProject from "../../helper/GetCurrentProject";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const RolesMemberCard = ({ user }) => {
  const currentProject = GetCurrentProject();
  const firestore = useFirestore();
  const [memberStatus, setMemberStatus] = useState(false);
  const [role, setRole] = useState("");
  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  useEffect(() => {
    firestore
      .collection("members")
      .doc(email)
      .get()
      .then((doc) => {
        if (user) {
          setRole(doc.data().projects[currentProject.projectId].userRole);
        }
      });
  }, []);

  const date = new Date(+user.createdAt).toDateString();

  // remove current project from selected user
  const removeUserHandler = (user) => {
    setMemberStatus(!memberStatus);
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
          .set({
            members: {
              [email]: firestore.FieldValue.delete(),
            }
          },
          { merge: true });
      });
  };

  // update userRole
  const roleHandler = (e, user) => {
    setRole(e.target.value);
    firestore
      .collection(`members`)
      .doc(email)
      .update({
        [`projects.${currentProject.projectId}.userRole`]: e.target.value,
      });
  };

  if (user) {
    console.log(user);
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
          <div>
            <select
              className={styles.options}
              onChange={(e) => roleHandler(e, user)}
              value={role}
            >
              <option>Not Assigned</option>
              <option>Front-End Developer</option>
              <option>Project Manager</option>
              <option>Back-End Developer</option>
              <option>QA</option>
              <option>Intern</option>
            </select>
          </div>
            <Button onClick={() => removeUserHandler(user)} error>
              Remove
            </Button>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default RolesMemberCard;
