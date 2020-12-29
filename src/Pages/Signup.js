import React, { useState } from "react";
import { Form } from "../components/index";
import loginImage from "../images/login.png";
import { createUser } from "../Redux/Actions";
import { connect } from "react-redux";
import firebase from "../config/firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { useFirestore } from "react-redux-firebase";
import { withRouter } from "react-router";

const Signup = (props) => {
  const history = useHistory();
  const firestore = useFirestore();

  const [userInput, setUserInput] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [error, setError] = useState("");

  const inputHandler = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    userInput.name === '' ? setError('Please enter your name') :
    firebase
      .auth()
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then((user) => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: userInput.name
          })
          .then(() => {
            const user = firebase.auth().currentUser;
            console.log(user);
            firestore
            .collection('members')
            .add({
              userName: user.displayName,
              userEmail: user.email,
              role: '',
              createdAt: Date.now(),
              projects: {},
            })
            .then((docRef) => {
              docRef.update({
                projectId: docRef.id
              });
            });
          })
          .catch(function (error) {
            setError(error.message);
          });
        props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Form>
      <Form.FormContainer>
        <Form.PictureContainer>
          <Form.Image src={loginImage} />
        </Form.PictureContainer>
        <Form.DetailsContainer>
          <Form.Title>Sign Up</Form.Title>
          <Form.InputWrapper>
            <Form.Icon>
              <i className="fas fa-user"></i>
            </Form.Icon>
            <Form.Input
              required
              name="name"
              type="text"
              placeholder="Name"
              onChange={inputHandler}
            ></Form.Input>
          </Form.InputWrapper>
          <Form.InputWrapper>
            <Form.Icon>
              <i className="fas fa-envelope" />
            </Form.Icon>
            <Form.Input
              name="email"
              type="text"
              placeholder="Email"
              onChange={inputHandler}
            ></Form.Input>
          </Form.InputWrapper>
          <Form.InputWrapper>
            <Form.Icon>
              <i className="fas fa-lock"></i>
            </Form.Icon>
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={inputHandler}
            ></Form.Input>
          </Form.InputWrapper>
          {error && <Form.Message error>{error}</Form.Message>}
          <Form.Button onClick={createUser}>SIGN UP</Form.Button>
          <Form.Frame>
            <Form.Span>Already a user? </Form.Span>
            <Form.LinkEl to="signin">Login</Form.LinkEl>
          </Form.Frame>
        </Form.DetailsContainer>
      </Form.FormContainer>
    </Form>
  );
};

// const mapStateToProps = (state) => {
//   return {

//   }
// }

export default withRouter(Signup);
