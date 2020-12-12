import React, { useState } from "react";
import { Form } from "../components/index";
import loginImage from "../Images/login.png";
import { createUser } from "../Redux/Actions";
import { connect } from "react-redux";
import firebase from "../Config/firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../Constants/routes";

const Signup = (props) => {
  const history = useHistory();
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
            displayName: userInput.name,
            photoURL: "",
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            setError(error.message);
          });
        history.push(ROUTES.HOME);
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

export default connect(null, { createUser })(Signup);