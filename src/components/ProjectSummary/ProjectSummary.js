import React from "react";
import Button from "../Button";
import styles from "./projectSummary.module.css";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { showModal } from "../../Redux/Actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {Spinner} from '../index';

const ProjectSummary = ({ currentProject, id }) => {
  const firestore = useFirestore();
  const history = useHistory();

  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  // edit projects info
  const handleChange = (e) => {
    firestore
      .collection("users")
      .doc(email)
      .collection("projects")
      .doc(id)
      .update({
        [e.target.name]: e.target.value,
      })
  };

  // delete selected project
  const deleteProjectHandler = (e) => {
    e.preventDefault();
    firestore
      .collection("users")
      .doc(email)
      .collection("projects")
      .doc(id)
      .delete()
      .catch(function (error) {
        // console.error(error);
      });
    history.push("/projects");
  };

  if (currentProject) {
    return (
      <div className={styles.container}>
        <div className={styles.overview}>
          <div className={styles.overview__header}>
            <h1>Project Overview</h1>
            <Button error onClick={deleteProjectHandler}>
              Delete Project
            </Button>
          </div>
          <div className={styles.overview__details}>
            <ul>
              <li className={styles.details__row__gray}>
                <h3>Project Title: </h3>
                <label htmlFor="title" onChange={handleChange}>
                  <i className="far fa-edit"></i>
                </label>
                <input
                  value={currentProject.title}
                  onChange={handleChange}
                  name="title"
                  id="title"
                />
              </li>
              <li className={styles.details__row}>
                <h3>Project Platform: </h3>
                <label htmlFor="platform" onChange={handleChange}>
                  <i className="far fa-edit"></i>
                </label>
                <input
                  value={currentProject.platform}
                  onChange={handleChange}
                  name="platform"
                  id="platform"
                />
              </li>
              <li className={styles.details__row}>
                <h3>Project Author: </h3>
                <label htmlFor="projectAuthor" onChange={handleChange}>
                  <i className="far fa-edit"></i>
                </label>
                <input
                  value={currentProject.projectAuthor}
                  onChange={handleChange}
                  name="projectAuthor"
                  id="projectAuthor"
                />
              </li>
              <li className={styles.details__row__gray}>
                <h3>Created: </h3>
                <input value={currentProject.createdAt} readOnly />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.members}>
        <div className={styles.overview__header}>
            <h1>Project members</h1>
          </div>
          <div className={styles.overview__details}>
            <ul>
              {currentProject.members.map((member, index) => {
                return (
                  <li className={index % 2 === 0 ? `${styles.details__row__gray}` : `${styles.details__row}`} key={index}>
                  <h3>{index + 1}. {member.name} ({member.email})</h3>
                </li>
                )
              })}
            </ul>
          </div>
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
    )
  }
};

export default connect(null, { showModal })(ProjectSummary);
