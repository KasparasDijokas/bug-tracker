import React, { useState } from "react";
import styles from "./members.module.css";
import Button from "../Button";
import MemberCard from "../MemberCard/MemberCard";
import Fuse from "fuse.js";
import EmailModal from "../EmailModal";
import { showEmailModal } from "../../Redux/Actions";
import { connect } from "react-redux";

const Members = ({ members, emailModal, showEmailModal }) => {
  const [searchInput, setSearchInput] = useState("");

  // create list array (all members) to use it with fuse.js
  let list = [];
  if (members) {
    Object.keys(members).map((id) => {
      return list.push(members[id]);
    });
  }
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
     return newList.push(el.item);
    });
    list = [...newList];
  }

  return (
    <div className={styles.container}>
      {emailModal && <EmailModal />}
      <div className={styles.header}>
        <h2>Project Members</h2>
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
          <Button onClick={() => showEmailModal()}>Invite Members</Button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.legend}>
          <p></p>
          <p>Member</p>
          <p>Joined At</p>
          <p>Role</p>
          <p>Assign Member</p>
        </div>
        {list &&
          list.map((user) => {
            return <MemberCard user={user} key={user.createdAt} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    emailModal: state.emailModal,
  };
};

export default connect(mapStateToProps, { showEmailModal })(Members);
