import React, { useState } from "react";
import Button from "../Button";
import styles from "./issues.module.css";
import Fuse from "fuse.js";
import IssuesCard from '../IssuesCard/IssuesCard';
import IssuesModal from '../IssuesModal/IssuesModal';
import {showIssuesModal} from '../../Redux/Actions';
import {connect} from 'react-redux';

const Issues = ({showIssuesModal, issuesModalState, currentProject}) => {
  
  const [searchInput, setSearchInput] = useState("");
  const [buttonState, setButtonState] = useState({
    all: true,
    opened: false,
    closed: false,
    assigned: false,
    reported: false,
    notAssigned: false,
  });

  // create list array (all members) to use it with fuse.js
  let list = [];
  // if (members) {
  //   Object.keys(members).map((id) => {
  //     list.push(members[id]);
  //   });
  // }
  // fuse.js
  const options = {
    includeScore: true,
    threshold: 0.1,
    keys: ["userName", "userEmail"],
  };
  const fuse = new Fuse(list, options);
  const result = fuse.search(searchInput);

  if (result.length > 0) {
    let newList = [];
    result.map((el) => {
      newList.push(el.item);
    });
    list = [...newList];
  }

  const buttonStateHandler = (e) => {
    setButtonState({
      [e.target.id]: !buttonState[e.target.id],
    });
  };

  if (currentProject) {
    return (
      <>
            <IssuesModal currentProject={currentProject}/>
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Issues summary</h2>
          <Button onClick={() => showIssuesModal()}>Add new issue</Button>
        </div>
        <div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <label htmlFor="search">
            <i className="fas fa-search"></i>
          </label>
        </div>
      </div>
      <div className={styles.legend}>
        <Button
          id="all"
          gray
          onClick={(e) => buttonStateHandler(e)}
          btnState={buttonState.all}
        >
          All issues ({currentProject.issues.length})
        </Button>
        <Button
          id="opened"
          gray
          onClick={(e) => buttonStateHandler(e)}
          btnState={buttonState.opened}
        >
          Opened issues (props)
        </Button>
        <Button
          id="closed"
          gray
          onClick={(e) => buttonStateHandler(e)}
          btnState={buttonState.closed}
        >
          Closed issues (props)
        </Button>
        <Button
          id="assigned"
          gray
          onClick={(e) => buttonStateHandler(e)}
          btnState={buttonState.assigned}
        >
          Assigned to me (props)
        </Button>
        <Button
          id="reported"
          gray
          onClick={(e) => buttonStateHandler(e)}
          btnState={buttonState.reported}
        >
          Reported By me (props)
        </Button>
        <Button
          id="notAssigned"
          gray
          onClick={(e) => buttonStateHandler(e)}
          btnState={buttonState.notAssigned}
        >
          Not Assigned (props)
        </Button>
      </div>
          <div className={styles.issues__header}>
              <Button>Columns visibility</Button>
              <Button>Add new Column</Button>
          </div>
      <div className={styles.issues__container}>
        <IssuesCard header="Submitted(1)"></IssuesCard>
        <IssuesCard header="Submitted(1)"></IssuesCard>
        <IssuesCard header="Submitted(1)"></IssuesCard>
        <IssuesCard header="Submitted(1)"></IssuesCard>
        <IssuesCard header="Submitted(1)"></IssuesCard>
        <IssuesCard header="Submitted(1)"></IssuesCard>
      </div>

    </div>
    </>
  );
  } else {
    return (
      <div>...loading</div>
    )
  }
  
};

const mapStateToProps = (state) => {
    return {
      issuesModalState: state.issuesModal,
    };
  };

export default connect(mapStateToProps, {showIssuesModal})(Issues);
