import * as TYPES from "../../constants/actions";
import firebase from "../../config/firebase";

export const createProject = (project) => {
  return (dispatch, getState, getFirestore) => {
     return getFirestore()
      .ref("projects")
      .push(project)
      .then(() => {
        console.log("update succesfull");
        dispatch({
          type: TYPES.CREATE_PROJECT,
          payload: {
            ...project,
            authorId: "Kasparas",
            date: new Date(),
          },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    //   const firestore = firebase.firestore();
    //   firestore
    //     .collection("projects")
    //     .add({
    //       ...project,
    //       author: "Kasparas",
    //       createdAt: new Date(),
    //     })
    //     .then(function (docRef) {
    //       dispatch({
    //         type: TYPES.CREATE_PROJECT,
    //         payload: {
    //           ...project,
    //           authorId: "Kasparas",
    //           date: new Date(),
    //         },
    //       });
    //     })
    //     .catch(function (error) {
    //       dispatch({ type: TYPES.CREATE_PROJECT_ERROR, error });
    //     });
  };
};
