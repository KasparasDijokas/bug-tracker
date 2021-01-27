import React, { useState, useEffect } from "react";
import styles from "./rolesMemberCard.module.css";
import userImage from "../../images/user.png";
import Button from "../Button";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const RolesMemberCard = ({ user, currentProject, id }) => {
  const firestore = useFirestore();
  const [memberStatus, setMemberStatus] = useState(false);
  const [role, setRole] = useState("");

  // connect to firestore (members collection)
  useFirestoreConnect({
    collection: `members`,
    storeAs: "members",
  });
  const members = useSelector((state) => state.firestore.data.members);

  // set role from db
  useEffect(() => {
    firestore
      .collection("projects")
      .doc(id)
      .get()
      .then((doc) => {
        setRole(doc.data().members[user]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // remove user from current project
  const removeUserHandler = (user) => {
    setMemberStatus(!memberStatus);
    firestore
      .collection(`projects`)
      .doc(id)
      .set(
        {
          members: {
            [`${user}`]: firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      );
  };

  // assign role to user
  const roleHandler = (e, user) => {
    setRole(e.target.value);
    firestore
      .collection(`projects`)
      .doc(id)
      .set(
        {
          members: {
            [`${user}`]: e.target.value,
          },
        },
        { merge: true }
      );
  };

  if (user && members) {
    return (
      <div className={styles.body__nav}>
        <div className={styles.member__card}>
          <div>
            <img src={userImage} alt="user" />
          </div>
          <div>
            <p className={styles.userName}>{members[user].userName}</p>
            <p className={styles.userEmail}>{members[user].userEmail}</p>
          </div>
          <p className={styles.card__text}>
            {new Date(members[user].createdAt).toDateString()}
          </p>
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
