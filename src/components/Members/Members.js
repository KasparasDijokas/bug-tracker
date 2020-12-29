import React from "react";
import styles from "./members.module.css";
import Button from "../Button";
import MemberCard from "../MemberCard/MemberCard";
import Fuse from 'fuse.js'
import {useSelector} from 'react-redux';
import {useFirestoreConnect} from 'react-redux-firebase';
import GetCurrentProject from '../../helper/GetCurrentProject';

const Members = ({members}) => {
  const currentProject = GetCurrentProject();
  const user = useSelector(state => {
    return state.firebase.auth;
  })

  const list = ["Old Man's War", 'The Lock Artist'];
  const options = {
    includeScore: true
  }
  const fuse = new Fuse(list, options);
  const result = fuse.search('od man');

  const newMemberHandler = (e) => {
    e.preventDefault();

  }

  useSelector(state => {
    // console.log(state);
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Project Members</h2>
        <div>
          <input type="text" name="search" id="search" placeholder="Search" />
          <label htmlFor="search">
            <i className="fas fa-search"></i>
          </label>
          <Button>Invite Members</Button>
          <Button error onClick={newMemberHandler}>Add New Member</Button>
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
        {members && Object.keys(members).map(id => {
         return <MemberCard user={members[id]} key={id}/>
        })}
      </div>
    </div>
  );
};

export default Members;
