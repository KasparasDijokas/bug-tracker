import firebase from "../../config/firebase";
import * as TYPES from "../../constants/actions";
import { useState, useEffect } from "react";

export const createUser = (user) => {
  return {
    type: TYPES.CREATE_USER,
    payload: {
      name: user.displayName,
      email: user.email,
      password: user.password,
    },
  };
};

export const showModal = () => {
  return {
    type: TYPES.SHOW_MODAL,
  };
};



export const syncProjects = () => {
  return (dispatch, getState) => {
    // const allProjects = [];
    //     const db = firebase.firestore()
    //     db.collection("projects")
    //     .onSnapshot(function(doc) {
    //         doc.forEach((userDoc) => {
    //             const project = userDoc.data();
    //             allProjects.push(project)
    //         })
    //     })
    const db = firebase.firestore()
    const projectsReference = db.collection("projects");
    projectsReference.get().then((querySnapshot) => {
      const allProjects = [];
      querySnapshot.forEach((userDoc) => {
        const project = userDoc.data();
        allProjects.push(project);
      });

      dispatch({
        type: TYPES.SYNC_PROJECTS,
        payload: {
          userProjects: allProjects,
        },
      });
    });


  };
};
