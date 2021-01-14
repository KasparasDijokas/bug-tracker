import React, { useState, useEffect } from "react";
import styles from "./rolesMemberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const RolesMemberCard = ({ user, currentProject }) => {
  const firestore = useFirestore();
  const [memberStatus, setMemberStatus] = useState(false);
  const [role, setRole] = useState("");

  useFirestoreConnect({
    collection: `members`,
    storeAs: "members",
  });

  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  const members = useSelector(state => state.firestore.data.members);

  // set role from db
  useEffect(() => {
    firestore
      .collection("members")
      .doc(user.email)
      .get()
      .then((doc) => {
          setRole(doc.data().projects[currentProject.projectId].userRole);
      });
  }, []);

  const removeUserHandler = (user) => {
    setMemberStatus(!memberStatus);
    firestore
          .collection(`users/${email}/projects`)
          .doc(currentProject.projectId)
          .update({
            members: firestore.FieldValue.arrayRemove({
              email: user.email,
              name: user.name,
            }),
          }).then(() => {
            firestore
            .collection("members")
            .doc(user.email)
            .set(
              {
                projects: {
                  [currentProject.projectId]: firestore.FieldValue.delete(),
                },
              },
              { merge: true }
            )
          })
  };

  // update userRole
  const roleHandler = (e, user) => {
    console.log(user);
    setRole(e.target.value);
    firestore
      .collection(`members`)
      .doc(user.email)
      .update({
        [`projects.${currentProject.projectId}.userRole`]: e.target.value,
      });
  };

  if (user && members) {
    return (
      <div className={styles.body__nav}>
        <div className={styles.member__card}>
          <div>
            <img src={userImage} alt="user" />
          </div>
          <div>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
          <p className={styles.card__text}>{new Date(members[user.email].createdAt).toDateString()}</p>
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
