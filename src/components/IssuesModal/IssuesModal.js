import React, { useState } from "react";
import { connect } from "react-redux";
import styles from "./issuesModal.module.css";
import Button from "../Button";
import { showIssuesModal } from "../../Redux/Actions";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";


function IssuesModal(props) {
  const firestore = useFirestore();


  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  useFirestoreConnect({
    collection: `members`,
    storeAs: "members",
  });
  const members = useSelector((state) => {
    return state.firestore.data.members;
  });
  console.log(members);
//   useFirestoreConnect({
//     collection: `users/${email}/projects`,
//     storeAs: "projects",
//   });
//   const projects = useSelector((state) => {
//     return state.firestore.data.projects;
//   });

  const [userInput, setuserInput] = useState({
    summary: "",
    assign: "",
    type: "",
    priority: "",
    status: "",
    object: "",
    issuesAuthor: email,
  });
  const [selectColor, setSelectColor] = useState("#bdbdbd");
  const [priorityColor, setPriorityColor] = useState("#0277bd");

  const formHandler = (e) => {
      console.log(e.target.value);
    switch (e.target.value) {
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
      default:
        setSelectColor("#fff");
    }
    setuserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const addNewIssue = () => {
    firestore
      .collection("users")
      .doc(email)
      .collection("projects")
      .doc(props.currentProject.projectId) // => currentProject
      .update({
        issues: firestore.FieldValue.arrayUnion(userInput),
        // dar reikia update memebers projects/issues -- ar rodyti tik tas kurias jam priskiria?
      }).then(() => {
          // assign issue to user
          firestore.collection('members').doc(userInput.assign).update({
              [`projects.${props.currentProject.projectId}.issues`]: firestore.FieldValue.arrayUnion(userInput)
          })
      })
    setuserInput("");
    props.showIssuesModal();
  };

  const cancelModal = (e) => {
    e.preventDefault();
    props.showIssuesModal();
  };

  if (members) {
    return (
        <>
          <div
            className={
              !props.issuesModalState
                ? `${styles.hideBackground}`
                : `${styles.showBackground}`
            }
            onClick={() => props.showIssuesModal()}
          ></div>
          <div
            className={
              !props.issuesModalState
                ? `${styles.modal}`
                : `${styles.modal} ${styles.show}`
            }
          >
            <div className={styles.modal__header}>
              <h3>Add new issue </h3>
              <span onClick={() => props.showIssuesModal()}>
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
                    ></input>
                  </div>
                  <div className={styles.assign}>
                    <p>Assign to</p>
                    <select name="assign" onChange={formHandler}>
                        {Object.keys(members).map(id => {
                            return <option key={id} value={id}>{members[id].userEmail}</option>
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
                      defaultValue={'Documentation'}
                    >
                      <option style={{ backgroundColor: "#fff" }}>No type</option>
                      <option value="Documentation" style={{ backgroundColor: "#bdbdbd" }}>
                        Documentation
                      </option>
                      <option style={{ backgroundColor: "#64b5f6" }}>Task</option>
                      <option style={{ backgroundColor: "#4db6ac" }}>
                        Feature
                      </option>
                      <option style={{ backgroundColor: "#9575cd" }}>
                        Usability problem
                      </option>
                      <option style={{ backgroundColor: "#e3af5b" }}>Bug</option>
                      <option style={{ backgroundColor: "#e57373" }}>Crash</option>
                    </select>
                  </div>
    
                  <div className={`${styles.options__bottom__element}`}>
                    <p>Priority</p>
                    <select
                      name="priority"
                      onChange={formHandler}
                      style={{ backgroundColor: priorityColor }}
                    >
                      <option style={{ backgroundColor: "#0277bd" }}>Low</option>
                      <option style={{ backgroundColor: "#2e7d32" }}>Medium</option>
                      <option style={{ backgroundColor: "#ff8f00" }}>High</option>
                      <option style={{ backgroundColor: "#c62828" }}>
                        Critical
                      </option>
                    </select>
                  </div>
    
                  <div className={`${styles.options__bottom__element}`}>
                    <p>Status</p>
                    <select name="status" onChange={formHandler}>
                      <option>Submitted</option>
                      <option>To be discussed</option>
                      <option>Reopened</option>
                      <option>In progress</option>
                    </select>
                  </div>
    
                  <div className={`${styles.options__bottom__element}`}>
                    <p>Test object</p>
                    <select name="object" onChange={formHandler}>
                      <option>object</option>
                      <option>banana</option>
                    </select>
                  </div>
                </div>
              </div>
    
              <div className={styles.textArea}>
                <label>Description</label>
                <textarea name="summary" onChange={formHandler}></textarea>
              </div>
              <div className={styles.buttons}>
                <Button onClick={addNewIssue}>Save</Button>
                <Button error onClick={cancelModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      );
  } else {
      return (
          <div>loading...</div>
      )
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
