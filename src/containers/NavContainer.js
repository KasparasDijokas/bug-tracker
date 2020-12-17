import React, { useState } from "react";
import { Nav } from "../components";
import logo from "../images/logo_main.png";
import user from "../images/user.png";
import {Button} from '../components';
import {connect} from 'react-redux';
import {showModal} from '../Redux/Actions';
import {Modal} from '../components';

const NavContainer = (props) => {
  // const addOrganizationHandler = () => {
  //   console.log("add organization");
  // };

  const addProjectHandler = (e) => {
    console.log('show modal');
    e.preventDefault();
    props.showModal();
  };

  const reportBugHandler = () => {
    console.log("report bug");
  };

  const [showNav, setShowNav] = useState(false);
  const tabletNavHandler = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      <Modal/>
    <Nav>
      <Nav.Header>
        <img src={logo} alt="logo" />
        <span>BugTracker</span>
      </Nav.Header>
      <Nav.Body showNav={showNav}>
        {!showNav ? (
          <i class="fas fa-angle-double-left" onClick={tabletNavHandler}></i>
        ) : (
          <i class="far fa-times-circle" onClick={tabletNavHandler}></i>
        )}
        {/* <Nav.TextLink to="/organizations">My Organizations</Nav.TextLink> */}
        <Nav.TextLink to="/projects">My Projects</Nav.TextLink>
        <Button onClick={addProjectHandler}>Add Project</Button>
        <Button error onClick={reportBugHandler}>
          Report a Bug
        </Button>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    modalState: state.showModalReducer,
  }
}

export default connect(mapStateToProps, {showModal: showModal})(NavContainer);
