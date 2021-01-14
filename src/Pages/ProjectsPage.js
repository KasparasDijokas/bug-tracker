import React from "react";
import { Project } from "../components";
import userImg from "../images/user.png";
import { Button } from "../components";
import ProjectsDashboard from "../containers/ProjectsDashboard";
import firebase from '../config/firebase';
// redux
import { connect } from "react-redux";
import { showModal } from "../Redux/Actions";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";

const ProjectsPage = (props) => {
  const firestore = useFirestore();
  const history = useHistory();
  const user = firebase.auth().currentUser;

  // destructure current user data
  const { email, createdAt, lastLoginAt } = useSelector(
    (state) => {
      return state.firebase.auth;
    }
  );

  // date conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  // listen to firestore
  useFirestoreConnect({
    collection: `users/${email}/projects`,
    storeAs: "projects",
  });

  useFirestoreConnect({
    collection: `users`,
    storeAs: "users",
  });

  // access projects and users
  const { projects, users } = useSelector((state) => {
    return state.firestore.data;
  });


  // count current projects issues and members
  const countIssues = (el) => {
    let sum = 0;
       Object.keys(projects[el].issues).map((section) => {
        return sum += projects[el].issues[section].length;
    });
    return sum;
  }
  const countMembers = (el) => {
      return projects[el].members.length;
  }

  // user selects project (redirect to project overview)
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
      <div style={{ display: "flex" }}>
        <ProjectsDashboard />
        <Project>
          <Project.Body>
            <Project.Header>
              <img src={userImg} alt="user" />
              <Project.Wrapper direction="column">
                <h1>{user && user.displayName}</h1>
                <p>
                  Registration date: {registrationDate.toLocaleDateString()}
                </p>
                <p>Last Sign In at: {lastLoginDate.toLocaleString()}</p>
              </Project.Wrapper>
              <Project.Card>
                <h2>My Projects</h2>
                <span>{projects ? Object.keys(projects).length : "0"}</span>
              </Project.Card>
              <Project.Card>
                <h2>Employees</h2>
                <span>{users ? Object.keys(users).length : '0'}</span>
              </Project.Card>
            </Project.Header>
            <Project.Main>
              <Project.ProjectHeader>
                <h2>My Projects</h2>
                <Button onClick={() => props.showModal()}>
                  Create New Project
                </Button>
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
                          <span>
                            {countIssues(el)}
                          </span>
                        </Project.Card>
                        <Project.Card>
                          <h2>Employees</h2>
                          <span>{countMembers(el)}</span>
                        </Project.Card>
                      </Project.ProjectCard>
                    );
                  })}

              <Project.ProjectHeader>
                <h2>Assigned to me</h2>
              </Project.ProjectHeader>
              {!projects
                ? ""
                : Object.keys(projects).map((el) => {
                    if (projects[el].members.includes(email)) {
                      return (
                        <Project.ProjectCard key={el}>
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
                            <span>{countIssues(el)}</span>
                          </Project.Card>
                          <Project.Card>
                            <h2>Employees</h2>
                            <span>{countMembers(el)}</span>
                          </Project.Card>
                        </Project.ProjectCard>
                      );
                    }
                  })}
            </Project.Main>
          </Project.Body>
        </Project>
      </div>
    );
};

export default connect(null, {
  showModal,
})(ProjectsPage);
