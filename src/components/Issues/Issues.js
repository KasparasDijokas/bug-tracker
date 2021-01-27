import React, { useState } from "react";
import Button from "../Button";
import styles from "./issues.module.css";
import IssuesModal from "../IssuesModal/IssuesModal";
import { showIssuesModal } from "../../Redux/Actions";
import { connect } from "react-redux";
import Bug from "../Bug";
import userImg from "../../images/user.png";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Spinner } from "../index";

const Issues = ({ showIssuesModal, currentProject, id }) => {
  const firestore = useFirestore();
  const [bugStatus, setBugStatus] = useState("all");
  const [currentBug, setCurrentBug] = useState(null);

  // connect to firestore
  useFirestoreConnect({
    collection: `members`,
    storeAs: "members",
  });
  const members = useSelector((state) => {
    return state.firestore.data.members;
  });

  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  function openModal(bug) {
    setCurrentBug(bug);
    showIssuesModal();
  }

  // drag start - set bug
  const handleDragStart = (e, bug, index) => {
    e.dataTransfer.setData("bug", JSON.stringify(bug));
    e.dataTransfer.setData("index", index);
  };

  // drag end -- parse bug and update firestore
  const handleOnDrop = (e, el) => {
    const bug = JSON.parse(e.dataTransfer.getData("bug"));
    firestore
      .collection(`projects`)
      .doc(id)
      .update({
        // => delete bug from old array
        [`issues.${bug.status}`]: firestore.FieldValue.arrayRemove(bug),
      })
      .then(() => {
        bug.status = el; // => change bug status
      })
      .then(() => {
        // => push bug to target array
        firestore
          .collection(`projects`)
          .doc(id)
          .update({
            [`issues.${el}`]: firestore.FieldValue.arrayUnion(bug),
          });
      });
  };

  // delete bug from firestore
  const deleteBugHandler = (bug) => {
    firestore
      .collection(`projects`)
      .doc(id)
      .update({
        [`issues.${bug.status}`]: firestore.FieldValue.arrayRemove(bug),
      });
  };

  // buttons state (navigation)
  const [buttonState, setButtonState] = useState({
    all: true,
    Submitted: false,
    Done: false,
    Assigned: false,
    "To do": false,
    "In progress": false,
  });

  // change button state (navigation)
  const buttonStateHandler = (e) => {
    setButtonState({
      [e.target.id]: !buttonState[e.target.id],
    });
    setBugStatus(e.target.id);
  };

  // count total issues
  let issuesLength = 0;
  const userBugs = [];
  Object.keys(currentProject.issues).forEach((el) => {
    issuesLength += currentProject.issues[el].length;
    currentProject.issues[el].forEach((bug) => {
      if (bug.assign === email) {
        userBugs.push(bug);
      }
    });
  });

  if (currentProject && members) {
    return (
      <>
        <IssuesModal
          currentProject={currentProject}
          currentBug={currentBug}
          members={currentProject.members}
          id={id}
        />
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h2>Issues summary</h2>
              <Button onClick={() => openModal()}>Add new issue</Button>
            </div>
          </div>
          <div className={styles.legend}>
            <Button
              id="all"
              gray
              btnState={buttonState.all}
              onClick={(e) => buttonStateHandler(e)}
            >
              All issues ({issuesLength})
            </Button>
            <Button
              id="Submitted"
              gray
              btnState={buttonState.Submitted}
              onClick={(e) => buttonStateHandler(e)}
            >
              Submitted issues ({currentProject.issues.Submitted.length})
            </Button>
            <Button
              id="Done"
              gray
              onClick={(e) => buttonStateHandler(e)}
              btnState={buttonState.Done}
            >
              Closed issues ({currentProject.issues.Done.length})
            </Button>
            <Button
              id={email}
              gray
              onClick={(e) => buttonStateHandler(e)}
              btnState={buttonState[email]}
            >
              Assigned to me ({userBugs.length})
            </Button>
            <Button
              id="To do"
              gray
              onClick={(e) => buttonStateHandler(e)}
              btnState={buttonState["To do"]}
            >
              To do ({currentProject.issues["To do"].length})
            </Button>
            <Button
              id="In progress"
              gray
              onClick={(e) => buttonStateHandler(e)}
              btnState={buttonState["In progress"]}
            >
              In progress ({currentProject.issues["In progress"].length})
            </Button>
          </div>
          <div className={styles.issues__header}></div>
          <div className={styles.issues__container}>
            {Object.keys(currentProject.issues)
              .sort()
              .map((el, index) => {
                return (
                  <div className={styles.column} key={el}>
                    <h3>{el}</h3>
                    <div
                      className={styles.column__body}
                      onDrop={(e) => handleOnDrop(e, el)}
                    >
                      {currentProject.issues[el]
                        .filter(
                          (bug) =>
                            bug.status === bugStatus ||
                            bugStatus === "all" ||
                            bugStatus === bug.assign
                        )
                        .map((bug, index) => {
                          return (
                            <Bug
                              key={bug.id}
                              draggable
                              id={bug.id}
                              onDragStart={(e) =>
                                handleDragStart(e, bug, index)
                              }
                            >
                              <Bug.Header headerColor={bug.priority}>
                                <div>
                                  #{index + 1} {bug.priority}
                                </div>
                                <span onClick={() => deleteBugHandler(bug)}>
                                  <i className="fas fa-trash-alt"></i>
                                </span>
                              </Bug.Header>
                              <Bug.Title>
                                {bug.title}
                                <span onClick={() => openModal(bug)}>
                                  <i className="fas fa-edit"></i> Edit
                                </span>
                              </Bug.Title>
                              <Bug.User>
                                <img
                                  src={userImg}
                                  alt="user"
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    marginRight: "6px",
                                  }}
                                />
                                {members[bug.assign].userEmail}
                              </Bug.User>
                              <Bug.Footer footerColor={bug.type}>
                                {bug.type}
                              </Bug.Footer>
                            </Bug>
                          );
                        })}
                    </div>{" "}
                  </div>
                );
              })}
          </div>
        </div>
      </>
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
    );
  }
};

export default connect(null, { showIssuesModal })(Issues);
