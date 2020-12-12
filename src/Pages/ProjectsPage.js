import React from "react";
import { Project } from "../components";
import DashboardContainer from "../containers/DashboardContainer";
import NavContainer from "../containers/NavContainer";
import user from '../images/user.png';
import {Button} from '../components';

const ProjectsPage = () => {
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
          <Project.ProjectCard>
          <img src={user} alt="user"/>
            <Project.Wrapper direction="column">
            <h1>name props redux</h1>
            <p>Created: props redux</p>
            <p>Owner: name redux</p>
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
          <Project.ProjectCard>
          <img src={user} alt="user"/>
            <Project.Wrapper direction="column">
            <h1>name props redux</h1>
            <p>Created: props redux</p>
            <p>Owner: name redux</p>
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
        </Project.Main>

        </Project.Body>
      </Project>
    </>
  );
};

export default ProjectsPage;
