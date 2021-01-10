import React, {useState} from "react";
import styles from "./settingsComponent.module.css";
import { Project } from "../index";
import userImg from "../../images/user.png";
import { useSelector } from "react-redux";
import firebase from '../../config/firebase';
import {Button} from '../index'

const SettingsComponent = ({ projects }) => {

    const { displayName, email, createdAt, lastLoginAt } = useSelector(
        (state) => {
            return state.firebase.auth;
    }
    );
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');



    React.useEffect(() => {
        setUserName(displayName)
    }, [displayName])

  // data conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  const updatePassword = (e) => {
    const user = firebase.auth().currentUser;
    if (userPassword === repeatPassword) {
    
        user.updatePassword(userPassword).then(function() {
            console.log('success');
          }).catch(function(error) {
            setErrorMessage(error.message);
          });
    } else {
        setErrorMessage('Please make sure your passwords match')
    }

  }

  const updateProfile = (e) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: userName,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        console.log('success');
      }).catch(function(error) {
        
      });
  }

  if (projects) {
    return (
        <div className={styles.container}>
      <div >
        <Project>
          <Project.Body>
            <Project.Header>
              <img src={userImg} alt="user" />
              <Project.Wrapper direction="column">
                <h1>{displayName}</h1>
                <p>
                  Registration date: {registrationDate.toLocaleDateString()}
                </p>
                <p>Last Sign In at: {lastLoginDate.toLocaleString()}</p>
              </Project.Wrapper>
              <Project.Card>
                <h2>My Projects</h2>
                <span>{projects ? Object.keys(projects).length : "0"}</span>
              </Project.Card>
              <Project.Card>
                <h2>Employees</h2>
                <span>01</span>
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
                  value={userName}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  className={styles.input}
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  readOnly
                ></input>
              </li>
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
              <p className={errorMessage ? `${styles.showError}` : `${styles.hideError}`}>{errorMessage}</p>
            </ul>
            <Button onClick={updatePassword}>Save</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default SettingsComponent;
