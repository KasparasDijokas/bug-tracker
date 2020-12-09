import React from "react";
import { Login } from "../components/index";
import loginImage from "../Images/login.png";

const Signup = () => {
  return (
    <Login>
      <Login.Form>
        <Login.PictureContainer>
          <Login.Image src={loginImage} />
        </Login.PictureContainer>
        <Login.DetailsContainer>
          <Login.Title>Sign Up</Login.Title>
          <Login.InputWrapper>
            <Login.Icon>
              <i class="fas fa-envelope" />
            </Login.Icon>
            <Login.Input
              name="name"
              type="text"
              placeholder="Name"
            ></Login.Input>
          </Login.InputWrapper>
          <Login.InputWrapper>
            <Login.Icon>
              <i class="fas fa-envelope" />
            </Login.Icon>
            <Login.Input
              name="email"
              type="text"
              placeholder="Email"
            ></Login.Input>
          </Login.InputWrapper>
          <Login.InputWrapper>
            <Login.Icon>
              <i class="fas fa-envelope"></i>
            </Login.Icon>
            <Login.Input
              name="password"
              type="password"
              placeholder="Password"
            ></Login.Input>
          </Login.InputWrapper>
          <Login.InputWrapper>
            <Login.Icon>
              <i class="fas fa-envelope"></i>
            </Login.Icon>
            <Login.Input
              name="password"
              type="password"
              placeholder="Repeat Password"
            ></Login.Input>
          </Login.InputWrapper>
          <Login.Button>SIGN UP</Login.Button>
          <Login.Frame>
            <Login.Span>Already a user? </Login.Span>
            <Login.LinkEl to="signin">Login</Login.LinkEl>
          </Login.Frame>
        </Login.DetailsContainer>
      </Login.Form>
    </Login>
  );
};

export default Signup;
