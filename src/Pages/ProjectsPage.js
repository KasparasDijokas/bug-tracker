import React from "react";
import { Project } from "../components";
import userImg from "../images/user.png";
import { Button } from "../components";
import ProjectsDashboard from '../containers/ProjectsDashboard';
import firebase from "../config/firebase";
// redux
import { connect } from "react-redux";
import { showModal } from "../Redux/Actions";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { saveCurrentProject } from "../Redux/Actions";
import { useFirestore } from "react-redux-firebase";

const ProjectsPage = (props) => {

  const firestore = useFirestore();
  const history = useHistory();
  const user = firebase.auth().currentUser;

  // destructure current user data
  const { displayName, email, createdAt, lastLoginAt } = useSelector(
    (state) => {
      console.log(state);
      return state.firebase.auth;
    }
  );

  // data conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  // listen to firestore
  useFirestoreConnect({
    collection: `users/${email}/projects`,
    storeAs: "projects",
  });

  // access projects
  const projects = useSelector((state) => {
    return state.firestore.data.projects;
  });

  const projectRedirectHandler = (project, id) => {
    firestore
      .collection("users")
      .doc(email)
      .set({
        id,
      })
      .then(() => {
        history.push("/overview");
      });
  };

  return (
    <div style={{display: 'flex'}}>
    <ProjectsDashboard/>
      <Project>
        <Project.Body>
          <Project.Header>
            <img src={userImg} alt="user" />
            <Project.Wrapper direction="column">
              <h1>{displayName}</h1>
              <p>Registration date: {registrationDate.toLocaleDateString()}</p>
              <p>Last Sign In at: {lastLoginDate.toLocaleString()}</p>
            </Project.Wrapper>
            <Project.Card>
              <h2>My Projects</h2>
              <span>{projects ? Object.keys(projects).length : "0"}</span>
            </Project.Card>
            <Project.Card>
              <h2>Employees</h2>
              <span>01</span>
            </Project.Card>
          </Project.Header>
          <Project.Main>
            <Project.ProjectHeader>
              <h2>My Projects</h2>
              <Button onClick={() => props.showModal()}>
                Create New Project
              </Button>
              prideti skilti kurioje rodytu kokius projektus esu sukures ir prie kuriu esu priskirtas
            </Project.ProjectHeader>
            {!projects
              ? ""
              : Object.keys(projects).map((el) => {
                  return (
                    <Project.ProjectCard key={projects[el].projectId}>
                      <img src={userImg} alt="user" />
                      <Project.Wrapper direction="column">
                        <div>
                          <h1
                            onClick={() =>
                              projectRedirectHandler(projects[el], el)
                            }
                          >
                            {projects[el].title}
                          </h1>
                        </div>
                        <p>Created: {projects[el].createdAt}</p>
                        <p>Owner: {projects[el].projectAuthor}</p>
                      </Project.Wrapper>

                      <Project.Card>
                        <Button
                          onClick={() =>
                            projectRedirectHandler(projects[el], el)
                          }
                          transparent
                        >
                          Overview
                        </Button>
                      </Project.Card>
                      <Project.Card>
                        <h2>Issues</h2>
                        <span>02</span>
                      </Project.Card>
                      <Project.Card>
                        <h2>Employees</h2>
                        <span>02</span>
                      </Project.Card>
                    </Project.ProjectCard>
                  );
                })}
          </Project.Main>
        </Project.Body>
      </Project>
    </div>
  );
};

export default connect(null, {
  showModal,
  saveCurrentProject,
})(ProjectsPage);
