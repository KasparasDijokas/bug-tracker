import React, { useState } from "react";
import { Form } from "../components/index";
import FormImage from "../images/login.png";
import firebase from "../config/firebase";
import * as ROUTES from "../constants/routes";
import { useHistory } from "react-router-dom";

const FormContainer = () => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");

  const userInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const loginHandler = (e) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        setMessage("An email has been sent");
        setTimeout(() => {
          history.push(ROUTES.SIGN_IN);
        }, 3000);
      })
      .catch(function (error) {
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
          <Form.Title>Reset Password</Form.Title>
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
          <Form.Button onClick={loginHandler}>Send</Form.Button>
          <Form.Frame>
            {error ? (
              <Form.Message>{error}</Form.Message>
            ) : message ? (
              <Form.Message>{message}</Form.Message>
            ) : (
              <>
                <Form.Span>Back to</Form.Span>{" "}
                <Form.LinkEl to="reset">Login page ?</Form.LinkEl>{" "}
              </>
            )}
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
