import React from "react";
import {Login} from "../components/index";
import loginImage from "../Images/login.png";

const LoginContainer = () => {
  return (
    <Login>
      <Login.Form>
        <Login.PictureContainer>
          <Login.Image src={loginImage} />
        </Login.PictureContainer>
        <Login.DetailsContainer>
          <Login.Title>Member Login</Login.Title>
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
          <Login.Button>LOGIN</Login.Button>
          <Login.Frame>
            <Login.Span>Forgot</Login.Span>
            <Login.LinkEl>Username / Password ?</Login.LinkEl>
          </Login.Frame>
          <Login.AccountWrapper>
          <Login.LinkEl to="/signup">
            Create your account <i class="fas fa-long-arrow-alt-right"></i>
          </Login.LinkEl>
          </Login.AccountWrapper>
          
        </Login.DetailsContainer>
      </Login.Form>
    </Login>
  );
};

export default LoginContainer;
