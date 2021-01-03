import React, { useState } from "react";
import styles from "./membersRoles.module.css";
import Button from "../Button";
import RolesMemberCard from "../RolesMemberCard/RolesMemberCard";
import Fuse from "fuse.js";
import {Link} from 'react-router-dom';

const MembersRoles = ({currentProjectMembers, showEmailModal}) => {
  const [searchInput, setSearchInput] = useState("");

  // create list array (all members) to use it with fuse.js
  let list = [];

  if (currentProjectMembers) {
    Object.keys(currentProjectMembers).map((id) => {
      list.push(currentProjectMembers[id]);
    });
  }

  // fuse.js
  const options = {
    includeScore: true,
    threshold: 0.1,
    keys: ["userName", "userEmail"],
  };
  const fuse = new Fuse(currentProjectMembers, options);
  const result = fuse.search(searchInput);

  if (result.length > 0) {
    let newList = [];
    result.map((el) => {
      newList.push(el.item);
    });
    list = [...newList];
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Role Assigment</h2>
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
          <Link to="/members">
          <Button>Add Members</Button>
          </Link>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.legend}>
          <p></p>
          <p>Member</p>
          <p>Joined At</p>
          <p>Role</p>
          <p>Member</p>
        </div>
        {list &&
          list.map((user) => {
            return <RolesMemberCard user={user} key={user.memberId} />;
          })}
      </div>
    </div>
  );
};

export default MembersRoles;
