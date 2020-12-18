import React from "react";
import { Project } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import NavContainer from "../containers/NavContainer";
import user from "../images/user.png";
import { Button } from "../components";
// redux
import { connect } from "react-redux";
import { showModal } from "../Redux/Actions";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

const ProjectsPage = (props) => {
  // destructure current user data
  const { displayName, email, createdAt, lastLoginAt } = useSelector( 
    (state) => {
      
      // console.log(state.firebase.data)
      return state.firebase.auth
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
    console.log(state.firestore.data.projects)
    return state.firestore.data.projects;
  });
  console.log()

  return (
    <>
      <NavContainer />
      <Project>
        <DashboardContainer />
        <Project.Body>
          <Project.Header>
            <img src={user} alt="user" />
            <Project.Wrapper direction="column">
              <h1>{displayName}</h1>
              <p>Registration date: {registrationDate.toLocaleDateString()}</p>
              <p>Last Sign In at: {lastLoginDate.toLocaleString()}</p>
            </Project.Wrapper>
            <Project.Card>
              <h2>My Projects</h2>
              <span>{projects ? Object.keys(projects).length : '0'}</span>
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
            </Project.ProjectHeader>
            {!projects
              ? ""
              : Object.keys(projects).map((el) => {
                  return (
                    <Project.ProjectCard key={projects[el].projectId}>
                      <img src={user} alt="user" />
                      <Project.Wrapper direction="column">
                        <Link to={`/${projects[el].projectId}`}>
                          <h1>{projects[el].title}</h1>
                        </Link>
                        <p>Created: {projects[el].createdAt}</p>
                        <p>Owner: {projects[el].projectAuthor}</p>
                      </Project.Wrapper>
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
    </>
  );
};

export default connect(null, {
  showModal,
})(ProjectsPage);
