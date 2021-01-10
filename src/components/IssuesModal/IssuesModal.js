import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./issuesModal.module.css";
import Button from "../Button";
import { showIssuesModal } from "../../Redux/Actions";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import uuid from "react-uuid";

function IssuesModal(props) {
  const firestore = useFirestore();
  const bug = props.currentBug ? props.currentBug : null;
  
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
//   useFirestoreConnect({
  //     collection: `users/${email}/projects`,
//     storeAs: "projects",
//   });
//   const projects = useSelector((state) => {
  //     return state.firestore.data.projects;
//   });



  const [userInput, setuserInput] = useState({
    title: '',
    summary: '',
    assign: Object.keys(members)[0],
    type: "",
    priority: '',
    status: '',
    object: "",
    issuesAuthor: email,
    id: uuid()
  });

useEffect(() => {
    setuserInput({
     title: props.currentBug ? props.currentBug.title : '',
     summary: props.currentBug ? props.currentBug.summary : '',
     assign: props.currentBug ? props.currentBug.assign : Object.keys(members)[0],
     type: props.currentBug ? props.currentBug.type : '',
     priority: props.currentBug ? props.currentBug.priority : '',
     status: props.currentBug ? props.currentBug.status : '',
     object: "",
     issuesAuthor: email,
     id: uuid()
   })
}, [props.currentBug])
console.log(userInput);

  const [selectColor, setSelectColor] = useState("#bdbdbd");
  const [priorityColor, setPriorityColor] = useState("#0277bd");

  const formHandler = (e) => {
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
      case "In progress":
      case "To do":
      case "Submitted":
      case "Done":
      case "Object":
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
    const db = firestore.collection("users").doc(email).collection("projects").doc(props.currentProject.projectId); // => currentProject
    db.update({
      [`issues.${bug ? bug.status : userInput.status}`]: firestore.FieldValue.arrayRemove(bug),
    }).then(() => {
      db.update({
        [`issues.${userInput.status}`]: firestore.FieldValue.arrayUnion(userInput),
        // firestore.FieldValue.arrayUnion(userInput)
        // dar reikia update members projects/issues -- ar rodyti tik tas kurias jam priskiria?
      })
    })
     .then(() => {
          // assign issue to user
          // userInput.assign &&
          console.log(userInput.assign);
          firestore.collection('members').doc(userInput.assign).update({
              [`projects.${props.currentProject.projectId}.issues`]: firestore.FieldValue.arrayRemove(bug)
          })
      }).then(() => {
        firestore.collection('members').doc(userInput.assign).update({
          [`projects.${props.currentProject.projectId}.issues`]: firestore.FieldValue.arrayUnion(userInput)
      })
      })
    setuserInput({
      ...userInput,
      title: '',
      summary: '',
      type: 'Documentation',
      id: uuid()
    });
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
                      value={userInput.title}
                    ></input>
                  </div>
                  <div className={styles.assign}>
                    <p>Assign to</p>
                    <select name="assign" onChange={formHandler} defaultValue={userInput.assign}>
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
                      value={userInput.type}
                    >
                      <option style={{ backgroundColor: "#fff" }}>No type</option>
                      <option value="Documentation" style={{ backgroundColor: "#bdbdbd" }}>
                        Documentation
                      </option>
                      <option value="Task" style={{ backgroundColor: "#64b5f6" }}>Task</option>
                      <option value="Feature" style={{ backgroundColor: "#4db6ac" }}>
                        Feature
                      </option>
                      <option value="Usability problem" style={{ backgroundColor: "#9575cd" }}>
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
                      value={userInput.priority}
                    >
                      <option value="Low" style={{ backgroundColor: "#0277bd" }}>Low</option>
                      <option style={{ backgroundColor: "#2e7d32" }}>Medium</option>
                      <option style={{ backgroundColor: "#ff8f00" }}>High</option>
                      <option style={{ backgroundColor: "#c62828" }}>
                        Critical
                      </option>
                    </select>
                  </div>
    
                  <div className={`${styles.options__bottom__element}`}>
                    <p>Status</p>
                    <select name="status" onChange={formHandler} value={userInput.status}>
                      <option value="Submitted">Submitted</option>
                      <option>To do</option>
                      <option>In progress</option>
                      <option>Done</option>
                    </select>
                  </div>
    
                  <div className={`${styles.options__bottom__element}`}>
                    <p>Test object</p>
                    <select name="object" onChange={formHandler} value={userInput.object}>
                      <option>object</option>
                    </select>
                  </div>
                </div>
              </div>
    
              <div className={styles.textArea}>
                <label>Description</label>
                <textarea name="summary" onChange={formHandler} defaultValue={userInput.summary}></textarea>
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
