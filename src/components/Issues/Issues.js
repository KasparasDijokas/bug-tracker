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

const Issues = ({ showIssuesModal, issuesModalState, currentProject }) => {
  const firestore = useFirestore();
  const [bugStatus, setBugStatus] = useState('all');
  const [currentBug, setCurrentBug] = useState(null);
  console.log(bugStatus);

  function openModal(bug) {
    setCurrentBug(bug);
    showIssuesModal()
  }

  const { email } = useSelector((state) => {
    return state.firebase.auth;
  });

  const handleDragStart = (e, bug, index) => {
    e.dataTransfer.setData("bug", JSON.stringify(bug));
    e.dataTransfer.setData("index", index);
  };

  const handleOnDrop = (e, el) => {
    const bug = JSON.parse(e.dataTransfer.getData("bug")); 
      firestore.collection(`users/${email}/projects`).doc(currentProject.projectId).update({ // => delete bug from old array
        [`issues.${bug.status}`]: firestore.FieldValue.arrayRemove(bug)
        // [`issues`].filter(el => el.id === bug.id)
      }).then(() => { // => delete bug from members collection
        // firestore.collection(`members`).doc(email).update({ 
        //   [`projects.${currentProject.projectId}.issues`]: firestore.FieldValue.arrayRemove(bug)
        // })
      })
      .then(() => {
        bug.status = el; // => change bug status
      }).then(() => { // => push bug to target array
        firestore.collection(`users/${email}/projects`).doc(currentProject.projectId).update({
          [`issues.${el}`]: firestore.FieldValue.arrayUnion(bug)
        })
      }).then(() => { // => push updated bug to members/issues array
      //   firestore.collection('members').doc(email).update({
      //     [`projects.${currentProject.projectId}.issues`]: firestore.FieldValue.arrayUnion(bug)
      // })
      })
  };

  const deleteBugHandler = (bug) => {
    firestore.collection(`users/${email}/projects`).doc(currentProject.projectId).update({
      [`issues.${bug.status}`]: firestore.FieldValue.arrayRemove(bug)
      // [`issues.${bug.status}`].filter(el => el.id === bug.id)
    }).then(() => {
      // firestore.collection(`members`).doc(email).update({
      //   [`projects.${currentProject.projectId}.issues`]: firestore.FieldValue.arrayRemove(bug)
      // })
    })
  }

  const [searchInput, setSearchInput] = useState("");
  const [buttonState, setButtonState] = useState({
    all: true,
    Submitted: false,
    Done: false,
    Assigned: false,
    ['To do']: false,
    ['In progress']: false,
  });

  
  useFirestoreConnect({
    collection: `members`,
    storeAs: "members",
  });
  const members = useSelector((state) => {
    return state.firestore.data.members;
  });
 


  
  const buttonStateHandler = (e) => {
    console.log(e.target.id);
    setButtonState({
      [e.target.id]: !buttonState[e.target.id],
    });
    setBugStatus(e.target.id);
  };

  let issuesLength = 0;
  const userBugs = [];
  Object.keys(currentProject.issues).map(el => {
      issuesLength += currentProject.issues[el].length;
      currentProject.issues[el].map(bug => {
        if (bug.assign === email) {
          userBugs.push(bug)
        }
      })
    })

  if (currentProject && members && email) {
    return (
      <>
       {/* <div >
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
 
        </Modal>
      </div> */}

        <IssuesModal currentProject={currentProject} currentBug={currentBug}/>
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
              To do ({currentProject.issues['To do'].length})
            </Button>
            <Button
              id="In progress"
              gray
              onClick={(e) => buttonStateHandler(e)}
              btnState={buttonState["In progress"]}
            >
              In progress ({currentProject.issues['In progress'].length})
            </Button>
          </div>
          <div className={styles.issues__header}>
            {/* <Button>Columns visibility</Button>
            <Button>Add new Column</Button> */}
          </div>
          <div className={styles.issues__container}>
            {Object.keys(currentProject.issues).sort().map((el, index) => {
              return (
                <div className={styles.column} key={el}>
                  <h3>{el}</h3>
                  <div
                    className={styles.column__body}
                    onDrop={(e) => handleOnDrop(e, el)}
                  >
                    {currentProject.issues[el].map((bug, index) => {
                      if (bug.status === bugStatus || bugStatus === 'all' || bugStatus === bug.assign) {
                        return (
                          <Bug
                            key={bug.id}
                            draggable
                            id={bug.id}
                            onDragStart={(e) => handleDragStart(e, bug, index)}
                          >
                            <Bug.Header headerColor={bug.priority}>
                              <div>
                              #{index + 1} {bug.priority}
                              </div>
                              <span onClick={() => deleteBugHandler(bug)}><i className="fas fa-trash-alt"></i></span>
                            </Bug.Header>
                            <Bug.Title>{bug.title}<span onClick={() => openModal(bug)}><i className="fas fa-edit"></i> Edit</span></Bug.Title>
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
                            <Bug.Footer footerColor="#bdbdbd">
                              {bug.type}
                            </Bug.Footer>
                          </Bug>
                        );
                      }
               
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
    return <div>...loading</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    issuesModalState: state.issuesModal,
  };
};

export default connect(mapStateToProps, { showIssuesModal })(Issues);
