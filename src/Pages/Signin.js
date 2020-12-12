import React, {useState} from "react";
import { Form } from "../components";
import FormImage from "../Images/login.png";
import firebase from "../Config/firebase";
import * as ROUTES from "../Constants/routes";
import { useHistory } from "react-router-dom";

const FormContainer = () => {
const history = useHistory();
  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const userInputHandler = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value
    })
  }

  const loginHandler = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then((user) => {
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
          <Form.Image src={FormImage} />
        </Form.PictureContainer>
        <Form.DetailsContainer>
          <Form.Title>Member Login</Form.Title>
          <Form.InputWrapper>
            <Form.Icon>
              <i className="fas fa-envelope" />
            </Form.Icon>
            <Form.Input
              name="email"
              type="text"
              placeholder="Email"
              onChange={userInputHandler}
            ></Form.Input>
          </Form.InputWrapper>
          <Form.InputWrapper>
            <Form.Icon>
              <i className="fas fa-envelope"></i>
            </Form.Icon>
            <Form.Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={userInputHandler}
            ></Form.Input>
          </Form.InputWrapper>
          {error && <Form.Message error>{error}</Form.Message>}
          <Form.Button onClick={loginHandler}>Login</Form.Button>
          <Form.Frame>
            <Form.Span>Forgot</Form.Span>
            <Form.LinkEl to="reset">Username / Password ?</Form.LinkEl>
          </Form.Frame>
          <Form.AccountWrapper>
            <Form.LinkEl to="/signup">
              Create your account
              <i className="fas fa-long-arrow-alt-right"></i>
            </Form.LinkEl>
          </Form.AccountWrapper>
        </Form.DetailsContainer>
      </Form.FormContainer>
    </Form>
  );
};

export default FormContainer;
