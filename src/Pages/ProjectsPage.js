import React, {useEffect} from "react";
import { Project } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import NavContainer from "../containers/NavContainer";
import user from '../images/user.png';
import {Button} from '../components';
import {connect}from 'react-redux';
import {syncProjects} from '../Redux/Actions'

const ProjectsPage = (props) => {

  useEffect(() => {
    props.syncProjects()
  }, []);
  
  
  console.log(props.projects.userProjects)
  return (
    <>
      <NavContainer />
      <Project>
        <DashboardContainer />
        <Project.Body>
        <Project.Header>
            <img src={user} alt="user"/>
            <Project.Wrapper direction="column">
            <h1>name props</h1>
            <p>Registration date: props</p>
            <p>Last Sign In at: props</p>
            </Project.Wrapper>
            <Project.Card>
              <h2>My Projects</h2>
              <span>02</span>
            </Project.Card>
            <Project.Card>
              <h2>Employees</h2>
              <span>01</span>
            </Project.Card>
        </Project.Header>
        <Project.Main>
        <Project.ProjectHeader>
            <h2>My Projects</h2>
            <Button>Create New Project</Button>
          </Project.ProjectHeader>
          { !props.projects.userProjects ? '' : props.projects.userProjects.map((project) => {
              return (
                <Project.ProjectCard key={project.createdAt.seconds}>
                <img src={user} alt="user"/>
                  <Project.Wrapper direction="column">
                  <h1>{project.title}</h1>
                  <p>Created: {project.createdAt.toDate().toLocaleString()}</p>
                  <p>Owner: {project.author}</p>
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
              )
          })

            }

{/* <Project.ProjectCard>
                <img src={user} alt="user"/>
                  <Project.Wrapper direction="column">
                  <h1>{props.projects.userProjects[0].title}</h1>
                  <p>Created: {props.projects.userProjects[0].createdAt}</p>
                  <p>Owner: {props.projects.userProjects[0].author}</p>
                  </Project.Wrapper>
                  <Project.Card>
                    <h2>Issues</h2>
                    <span>02</span>
                  </Project.Card>
                  <Project.Card>
                    <h2>Employees</h2>
                    <span>02</span>
                  </Project.Card>
                </Project.ProjectCard> */}

        </Project.Main>
        </Project.Body>
      </Project>
    </>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps, {syncProjects})(ProjectsPage);
