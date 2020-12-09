import React from "react";
import {
  Container,
  Inner,
  PictureContainer,
  Form,
  DetailsContainer,
  Image,
  Title,
  Input,
  LinkEl,
  Span,
  Button,
  InputWrapper,
  Icon,
  Frame,
  AccountWrapper
} from "./styles/login";

export default function Login({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Login.Form = function LoginForm({ children, ...restProps }) {
  return <Form {...restProps}>{children}</Form>;
};

Login.PictureContainer = function LoginPictureContainer({ children, ...restProps }) {
  return <PictureContainer {...restProps}>{children}</PictureContainer>;
};

Login.Image = function LoginImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Login.DetailsContainer = function LoginDetailsContainer({ children, ...restProps }) {
  return <DetailsContainer {...restProps}>{children}</DetailsContainer>;
};

Login.Title = function LoginTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
  };

  Login.LinkEl = function LoginLinkEl({ children, ...restProps }) {
    return <LinkEl {...restProps}>{children}</LinkEl>;
  };

  Login.Span = function LoginSpan({ children, ...restProps }) {
    return <Span {...restProps}>{children}</Span>;
  };

  Login.Button = function LoginButton({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
  };

  Login.InputWrapper = function LoginInputWrapper({ children, ...restProps }) {
    return <InputWrapper {...restProps}>{children}</InputWrapper>;
  };


  Login.Input = function LoginInput({...restProps }) {
    return <Input {...restProps}/>
  };

  Login.Icon = function LoginIcon({ children, ...restProps }) {
    return <Icon {...restProps}>{children}</Icon>;
  };

  Login.Frame = function LoginFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>;
  };

  Login.AccountWrapper = function LoginAccountWrapper({ children, ...restProps }) {
    return <AccountWrapper {...restProps}>{children}</AccountWrapper>;
  };