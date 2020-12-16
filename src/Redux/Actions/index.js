import firebase from "../../config/firebase";
import * as TYPES from "../../constants/actions";
import { useState, useEffect } from "react";

export const createUser = ({ name, email, password }) => {
  return {
    type: TYPES.CREATE_USER,
    payload: {
      name: name,
      email: email,
      password: password,
    },
  };
};

export const showModal = () => {
  return {
    type: TYPES.SHOW_MODAL,
  };
};

export const createProject = (project) => {
  return (dispatch, getState) => {
    const firestore = firebase.firestore();
    firestore
      .collection("projects")
      .add({
        ...project,
        author: "Kasparas",
        createdAt: new Date(),
      })
      .then(function (docRef) {
        dispatch({
          type: TYPES.CREATE_PROJECT,
          payload: {
            ...project,
            author: "Kasparas",
            date: new Date(),
          },
        });
      })
      .catch(function (error) {
        dispatch({ type: TYPES.CREATE_PROJECT_ERROR, error });
      });
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
