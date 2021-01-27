import React from "react";
import { Nav } from "../components";
import logo from "../images/logo_main.png";
import user from "../images/user.png";
import { Button } from "../components";
import { connect } from "react-redux";
import { showModal } from "../Redux/Actions";
import { Modal } from "../components";
import firebase from "../config/firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const NavContainer = (props) => {
  const history = useHistory();

  const addProjectHandler = (e) => {
    e.preventDefault();
    props.showModal();
  };

  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push(ROUTES.SIGN_UP);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <Modal />
      <Nav>
        <Nav.Header>
          <img src={logo} alt="logo" />
          <span>BugTracker</span>
        </Nav.Header>
        <Nav.Body>
          <Nav.TextLink to={ROUTES.PROJECTS}>My Projects</Nav.TextLink>
          <Button onClick={addProjectHandler} style={{ margin: "0 24px" }}>
            Add Project
          </Button>
          <Nav.Wrapper>
            <img src={user} alt="user" />
            <Nav.TextLink to={ROUTES.SETTINGS}>My Profile</Nav.TextLink>
            <Nav.TextLink to={ROUTES.SIGN_IN}>
              <i className="fas fa-sign-out-alt" onClick={signOutHandler}></i>
            </Nav.TextLink>
          </Nav.Wrapper>
        </Nav.Body>
        <Nav.TabletNav></Nav.TabletNav>
      </Nav>
    </>
  );
};

export default connect(null, { showModal: showModal })(NavContainer);
