import React, { useState, useEffect } from "react";
import styles from "./settingsComponent.module.css";
import { Project } from "../index";
import userImg from "../../images/user.png";
import { useSelector } from "react-redux";
import firebase from "../../config/firebase";
import { Button } from "../index";

const SettingsComponent = ({ projects }) => {
  const { displayName, email, createdAt, lastLoginAt } = useSelector(
    (state) => {
      return state.firebase.auth;
    }
  );
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setUserName(displayName);
  }, [displayName]);

  // data conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  // new password handler
  const updatePassword = (e) => {
    const user = firebase.auth().currentUser;
    if (userPassword === repeatPassword) {
      user
        .updatePassword(userPassword)
        .then(function () {
          setSuccessMessage("success");
        })
        .catch(function (error) {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage("Please make sure your passwords match");
    }
  };

  // count projects
  const projectsCount = () => {
    let sum = 0;
    Object.keys(projects).map((project) => {
      return projects[project].projectAuthorEmail === email && sum++;
    });
    return sum;
  };
  // count members
  const membersCount = () => {
    let sum = 0;
    Object.keys(projects).map((id) => {
      return projects[id].members.hasOwnProperty(email) && sum++;
    });
    return sum;
  };
  // update user info in firestore
  const updateProfile = (e) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: userName,
      })
      .then(function () {
        setSuccessMessage("success");
      })
      .then(() => {
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      })
      .catch(function (error) {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <Project>
          <Project.Body>
            <Project.Header>
              <img src={userImg} alt="user" />
              <Project.Wrapper direction="column">
                <h1>{userName ? userName : displayName}</h1>
                <p>
                  Registration date: {registrationDate.toLocaleDateString()}
                </p>
                <p>Last Sign In at: {lastLoginDate.toLocaleString()}</p>
              </Project.Wrapper>
              <Project.Card>
                <h2>My Projects</h2>
                <span>{projects && projectsCount()}</span>
              </Project.Card>
              <Project.Card>
                <h2>Member</h2>
                <span>{projects && membersCount()}</span>
              </Project.Card>
            </Project.Header>
          </Project.Body>
        </Project>
      </div>
      <div className={styles.body}>
        <div className={styles.info}>
          <h3>Personal Information</h3>
          <ul>
            <li>
              <label htmlFor="last__name">Name</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                name="last__name"
                id="last__name"
                value={userName ? userName : ""}
              ></input>
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input
                className={styles.input}
                type="text"
                name="email"
                id="email"
                value={email ? email : ""}
                readOnly
              ></input>
            </li>
            <p
              className={
                successMessage
                  ? `${styles.showSuccessMessage}`
                  : `${styles.hideSuccessMessage}`
              }
            >
              {successMessage}
            </p>
          </ul>
          <Button onClick={updateProfile}>Save</Button>
        </div>
        <div className={styles.password}>
          <h3>Change password</h3>
          <ul>
            <li>
              <label htmlFor="current_passwod">New password</label>
              <input
                className={styles.input}
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
                name="current_passwod"
                id="current_passwod"
              ></input>
            </li>
            <li>
              <label htmlFor="new__password">Repeat new password</label>
              <input
                className={styles.input}
                onChange={(e) => setRepeatPassword(e.target.value)}
                type="password"
                name="new__password"
                id="new__password"
              ></input>
            </li>
            <p
              className={
                errorMessage ? `${styles.showError}` : `${styles.hideError}`
              }
            >
              {errorMessage}
            </p>
          </ul>
          <Button onClick={updatePassword}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsComponent;
