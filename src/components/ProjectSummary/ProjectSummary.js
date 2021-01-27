import React from "react";
import Button from "../Button";
import styles from "./projectSummary.module.css";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { showModal } from "../../Redux/Actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Spinner } from "../index";
import { useFirestoreConnect } from "react-redux-firebase";

const ProjectSummary = ({ currentProject, id }) => {
  const firestore = useFirestore();
  const history = useHistory();

  // connect to firestore (members collection)
  useFirestoreConnect({
    collection: `members`,
    storeAs: "membersData",
  });
  const { membersData } = useSelector((state) => {
    return state.firestore.data;
  });

  // edit projects info (title, username)
  const handleChange = (e) => {
    firestore
      .collection("projects")
      .doc(id)
      .update({
        [e.target.name]: e.target.value,
      });
  };

  // delete project from firestore
  const deleteProjectHandler = (e) => {
    e.preventDefault();
    firestore
      .collection("projects")
      .doc(id)
      .delete()
      .catch(function (error) {
        // console.error(error);
      });
    history.push("/projects");
  };

  if (currentProject && membersData) {
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
                <div className="platform">
                  <div>
                    <input
                      type="radio"
                      name="platform"
                      value="android"
                      checked={currentProject.platform === "android"}
                      onChange={handleChange}
                    />
                    <label htmlFor="android">Android</label>
                    <input
                      type="radio"
                      name="platform"
                      value="iOs"
                      checked={currentProject.platform === "iOs"}
                      onChange={handleChange}
                    />
                    <label htmlFor="apple">iOS</label>
                    <input
                      type="radio"
                      name="platform"
                      value="web"
                      checked={currentProject.platform === "web"}
                      onChange={handleChange}
                    />
                    <label htmlFor="web">Web</label>
                  </div>
                </div>
              </li>
              <li className={styles.details__row__gray}>
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
              <li className={styles.details__row}>
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
              {Object.keys(currentProject.members).map((member, index) => {
                return (
                  <li
                    className={
                      index % 2 === 0
                        ? `${styles.details__row__gray}`
                        : `${styles.details__row}`
                    }
                    key={index}
                  >
                    <p>
                      {index + 1}. {membersData[member].userName}{" "}
                      {currentProject.members[member]
                        ? `(${currentProject.members[member]})`
                        : "(Role is not assigned)"}
                    </p>
                  </li>
                );
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
          width: "100%",
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

export default connect(null, { showModal })(ProjectSummary);
