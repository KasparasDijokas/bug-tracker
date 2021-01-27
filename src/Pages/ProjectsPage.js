import React from "react";
import { Project } from "../components";
import userImg from "../images/user.png";
import { Button } from "../components";
import ProjectsDashboard from "../containers/ProjectsDashboard";
import firebase from "../config/firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
// redux
import { connect } from "react-redux";
import { showModal } from "../Redux/Actions";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const ProjectsPage = (props) => {
  const user = firebase.auth().currentUser;

  // destructure current user data
  const { email, createdAt, lastLoginAt } = useSelector((state) => {
    return state.firebase.auth;
  });

  // date conversion
  let registrationDate = new Date();
  registrationDate.setTime(+createdAt);

  let lastLoginDate = new Date();
  lastLoginDate.setTime(+lastLoginAt);

  //  PROJECTS COLLECTION
  useFirestoreConnect({
    collection: `projects`,
    storeAs: "projectsCollection",
  });
  const { projectsCollection } = useSelector((state) => {
    return state.firestore.data;
  });

  const projectsCount = () => {
    let sum = 0;
    Object.keys(projectsCollection).map((project) => {
      return projectsCollection[project].projectAuthorEmail === email && sum++;
    });
    return sum;
  };

  const membersCount = () => {
    let sum = 0;
    Object.keys(projectsCollection).map((id) => {
      return projectsCollection[id].members.hasOwnProperty(email) && sum++;
    });
    return sum;
  };

  // count current projects issues and members
  const countIssues = (id) => {
    let sum = 0;
    Object.keys(projectsCollection[id].issues).map((section) => {
      return (sum += projectsCollection[id].issues[section].length);
    });
    return sum;
  };

  if (email && projectsCollection) {
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
                <span>{projectsCollection && projectsCount()}</span>
              </Project.Card>
              <Project.Card>
                <h2>Member</h2>
                <span>{projectsCollection && membersCount()}</span>
              </Project.Card>
            </Project.Header>
            <Project.Main>
              <Project.ProjectHeader>
                <h2>My Projects</h2>
                <Button onClick={() => props.showModal()}>
                  Create New Project
                </Button>
              </Project.ProjectHeader>
              {!projectsCollection
                ? ""
                : Object.keys(projectsCollection)
                    .filter(
                      (projectId) =>
                        projectsCollection[projectId].projectAuthorEmail ===
                        email
                    )
                    .map((id) => {
                      return (
                        <Project.ProjectCard key={id}>
                          <img src={userImg} alt="user" />
                          <Project.Wrapper direction="column">
                            <div>
                              <Link to={`${ROUTES.OVERVIEW}/${id}`}>
                                <h1>{projectsCollection[id].title}</h1>
                              </Link>
                            </div>
                            <p>Created: {projectsCollection[id].createdAt}</p>
                            <p>Owner: {projectsCollection[id].projectAuthor}</p>
                          </Project.Wrapper>

                          <Project.Card>
                            <Link to={`${ROUTES.OVERVIEW}/${id}`}>
                              <Button transparent>Overview</Button>
                            </Link>
                          </Project.Card>
                          <Project.Card>
                            <h2>Issues</h2>
                            <span>{countIssues(id)}</span>
                          </Project.Card>
                          <Project.Card>
                            <h2>Project author</h2>
                            <h4>{projectsCollection[id].projectAuthor}</h4>
                          </Project.Card>
                        </Project.ProjectCard>
                      );
                    })}
              <Project.ProjectHeader>
                <h2>Assigned to me</h2>
              </Project.ProjectHeader>
              {Object.keys(projectsCollection)
                .filter((projectId) =>
                  projectsCollection[projectId].members.hasOwnProperty(email)
                )
                .map((id) => {
                  return (
                    <Project.ProjectCard key={id}>
                      <img src={userImg} alt="user" />
                      <Project.Wrapper direction="column">
                        <div>
                          <Link to={`${ROUTES.OVERVIEW}/${id}`}>
                            <h1>{projectsCollection[id].title}</h1>
                          </Link>
                        </div>
                        <p>Created: {projectsCollection[id].createdAt}</p>
                        <p>Owner: {projectsCollection[id].projectAuthor}</p>
                      </Project.Wrapper>

                      <Project.Card>
                        <Link to={`${ROUTES.OVERVIEW}/${id}`}>
                          <Button transparent>Overview</Button>
                        </Link>
                      </Project.Card>
                      <Project.Card>
                        <h2>Issues</h2>
                        <span>{countIssues(id)}</span>
                      </Project.Card>
                      <Project.Card>
                        <h2>Project Author</h2>
                        <h4>{projectsCollection[id].projectAuthor}</h4>
                      </Project.Card>
                    </Project.ProjectCard>
                  );
                })}
            </Project.Main>
          </Project.Body>
        </Project>
      </div>
    );
  } else {
    return (
      <div style={{ display: "flex" }}>
        <ProjectsDashboard />
        <Project>
          <Project.Header>
            <img src={userImg} alt="user" />
            <Project.Wrapper direction="column">
              <h1>{user && user.displayName}</h1>
              <p>Registration date: {registrationDate.toLocaleDateString()}</p>
              <p>Last Sign In at: {lastLoginDate.toLocaleString()}</p>
            </Project.Wrapper>
            <Project.Card>
              <h2>My Projects</h2>
              <span>{projectsCollection ? projectsCount() : "0"}</span>
            </Project.Card>
            <Project.Card>
              <h2>Member</h2>
              <span>{projectsCollection ? membersCount() : "0"}</span>
            </Project.Card>
          </Project.Header>
        </Project>
      </div>
    );
  }
};

export default connect(null, {
  showModal,
})(ProjectsPage);
