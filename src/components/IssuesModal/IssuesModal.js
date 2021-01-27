import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./issuesModal.module.css";
import Button from "../Button";
import { showIssuesModal } from "../../Redux/Actions";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

function IssuesModal({
  currentBug,
  id,
  currentProject,
  members,
  issuesModalState,
  showIssuesModal,
}) {
  const firestore = useFirestore();

  // check if modal was opened with bug (edit) or user wants to create new bug
  const bug = currentBug ? currentBug : null;

  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  const [userInput, setuserInput] = useState({
    title: "",
    summary: "",
    assign: email,
    type: "",
    priority: "",
    status: "To do",
    object: "",
    issuesAuthor: email,
    id: uuid(),
  });

  // if modal was opened with bug then take data from that bug and set userInput
  useEffect(() => {
    setuserInput({
      title: currentBug ? currentBug.title : "",
      summary: currentBug ? currentBug.summary : "",
      assign: currentBug ? currentBug.assign : email,
      type: currentBug ? currentBug.type : "Documentation",
      priority: currentBug ? currentBug.priority : "",
      status: currentBug ? currentBug.status : "To do",
      object: "",
      issuesAuthor: email,
      id: uuid(),
    });
    // managing buttons colors
    if (currentBug) {
      buttonColors(currentBug.type);
      buttonColors(currentBug.priority);
    } else {
      setSelectColor("#bdbdbd");
      setPriorityColor("#0277bd");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBug]);

  const [selectColor, setSelectColor] = useState("#bdbdbd");
  const [priorityColor, setPriorityColor] = useState("#0277bd");

  // buttons colors function
  const buttonColors = (type) => {
    switch (type) {
      case "Documentation":
        setSelectColor("#bdbdbd");
        break;
      case "Task":
        setSelectColor("#64b5f6");
        break;
      case "Feature":
        setSelectColor("#4db6ac");
        break;
      case "Usability problem":
        setSelectColor("#9575cd");
        break;
      case "Bug":
        setSelectColor("#e3af5b");
        break;
      case "Crash":
        setSelectColor("#e57373");
        break;
      case "Low":
        setPriorityColor("#0277bd");
        break;
      case "Medium":
        setPriorityColor("#2e7d32");
        break;
      case "High":
        setPriorityColor("#ff8f00");
        break;
      case "Critical":
        setPriorityColor("#e57373");
        break;
      case "In progress":
      case "To do":
      case "Submitted":
      case "Done":
      case "Object":
        break;
      default:
    }
  };

  // user Input handler
  const formHandler = (e) => {
    buttonColors(e.target.value);
    setuserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  // update firestore with new issue
  const addNewIssue = () => {
    const db = firestore.collection("projects").doc(id);
    db.update({
      [`issues.${
        bug ? bug.status : userInput.status
      }`]: firestore.FieldValue.arrayRemove(bug),
    }).then(() => {
      db.update({
        [`issues.${userInput.status}`]: firestore.FieldValue.arrayUnion(
          userInput
        ),
      });
    });
    // reset userInput
    setuserInput({
      ...userInput,
      title: "",
      summary: "",
      type: "Documentation",
      id: uuid(),
    });
    showIssuesModal();
  };

  const cancelModal = (e) => {
    e.preventDefault();
    showIssuesModal();
  };

  if (members) {
    return (
      <>
        <div
          className={
            !issuesModalState
              ? `${styles.hideBackground}`
              : `${styles.showBackground}`
          }
          onClick={() => showIssuesModal()}
        ></div>
        <div
          className={
            !issuesModalState
              ? `${styles.modal}`
              : `${styles.modal} ${styles.show}`
          }
        >
          <div className={styles.modal__header}>
            <h3>Add new issue </h3>
            <span
              onClick={() => {
                showIssuesModal();
              }}
            >
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className={styles.modal__body}>
            <div className={styles.options}>
              <div className={styles.options__top}>
                <div className={styles.summary}>
                  <p>Summary</p>
                  <input
                    className={styles.project__name}
                    type="text"
                    onChange={formHandler}
                    name="title"
                    value={userInput.title}
                  ></input>
                </div>
                <div className={styles.assign}>
                  <p>Assign to</p>
                  <select
                    name="assign"
                    onChange={formHandler}
                    value={userInput.assign}
                  >
                    {Object.keys(currentProject.members).map((id) => {
                      return (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className={styles.options__bottom}>
                <div
                  className={`${styles.options__bottom__element} ${styles.issue__type}`}
                >
                  <p>Issue type</p>
                  <select
                    name="type"
                    onChange={formHandler}
                    style={{ backgroundColor: selectColor }}
                    value={userInput.type}
                  >
                    <option style={{ backgroundColor: "#fff" }}>No type</option>
                    <option
                      value="Documentation"
                      style={{ backgroundColor: "#bdbdbd" }}
                    >
                      Documentation
                    </option>
                    <option value="Task" style={{ backgroundColor: "#64b5f6" }}>
                      Task
                    </option>
                    <option
                      value="Feature"
                      style={{ backgroundColor: "#4db6ac" }}
                    >
                      Feature
                    </option>
                    <option
                      value="Usability problem"
                      style={{ backgroundColor: "#9575cd" }}
                    >
                      Usability problem
                    </option>
                    <option style={{ backgroundColor: "#e3af5b" }}>Bug</option>
                    <option style={{ backgroundColor: "#e57373" }}>
                      Crash
                    </option>
                  </select>
                </div>

                <div className={`${styles.options__bottom__element}`}>
                  <p>Priority</p>
                  <select
                    name="priority"
                    onChange={formHandler}
                    style={{ backgroundColor: priorityColor }}
                    value={userInput.priority}
                  >
                    <option value="Low" style={{ backgroundColor: "#0277bd" }}>
                      Low
                    </option>
                    <option style={{ backgroundColor: "#2e7d32" }}>
                      Medium
                    </option>
                    <option style={{ backgroundColor: "#ff8f00" }}>High</option>
                    <option style={{ backgroundColor: "#c62828" }}>
                      Critical
                    </option>
                  </select>
                </div>

                <div className={`${styles.options__bottom__element}`}>
                  <p>Status</p>
                  <select
                    name="status"
                    onChange={formHandler}
                    value={userInput.status}
                  >
                    <option value="Submitted">Submitted</option>
                    <option>To do</option>
                    <option>In progress</option>
                    <option>Done</option>
                  </select>
                </div>

                <div className={`${styles.options__bottom__element}`}>
                  <p>Test object</p>
                  <select
                    name="object"
                    onChange={formHandler}
                    value={userInput.object}
                  >
                    <option>object</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.textArea}>
              <label>Description</label>
              <textarea
                name="summary"
                onChange={formHandler}
                value={userInput.summary}
              ></textarea>
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  addNewIssue();
                }}
              >
                Save
              </Button>
              <Button error onClick={cancelModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    issuesModalState: state.issuesModal,
  };
};

export default connect(mapStateToProps, {
  showIssuesModal,
})(IssuesModal);
