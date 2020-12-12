import React, { useState } from "react";
import { Nav } from "../components";
import logo from "../Images/logo_main.png";
import user from "../Images/user.png";

const NavContainer = () => {
  const addOrganizationHandler = () => {
    console.log("add organization");
  };

  const addProjectHandler = () => {
    console.log("add project");
  };

  const reportBugHandler = () => {
    console.log("report bug");
  };

  const [showNav, setShowNav] = useState(false);
  const tabletNavHandler = () => {
    setShowNav((prevValue) => !showNav);
  };

  return (
    <Nav>
      <Nav.Header>
        <img src={logo} alt="logo" />
        <span>BugTracker</span>
      </Nav.Header>
      <Nav.Body showNav={showNav}>
        <span onClick={tabletNavHandler}>
          {!showNav ? (
            <i class="far fa-times-circle"></i>
          ) : (
            <i class="fas fa-angle-double-left"></i>
          )}
        </span>
        <Nav.TextLink to="/organizations">My Organizations</Nav.TextLink>
        <Nav.TextLink to="/projects">My Projects</Nav.TextLink>
        <Nav.Button onClick={addOrganizationHandler}>
          Add Organization
        </Nav.Button>
        <Nav.Button onClick={addProjectHandler}>Add Project</Nav.Button>
        <Nav.Button error onClick={reportBugHandler}>
          Report a Bug
        </Nav.Button>
        <Nav.Wrapper>
          <img src={user} alt="user" />
          <Nav.TextLink to="/profile">My Profile</Nav.TextLink>
          <Nav.TextLink to="/signin">
            <i class="fas fa-sign-out-alt"></i>
          </Nav.TextLink>
        </Nav.Wrapper>
      </Nav.Body>
      <Nav.TabletNav></Nav.TabletNav>
    </Nav>
  );
};

export default NavContainer;
