import React from "react";
import {
  Container,
  Inner,
  PictureContainer,
  FormContainer,
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
  AccountWrapper,
  Message
} from "./styles/form";

export default function Form({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Form.FormContainer = function FormFormContainer({ children, ...restProps }) {
  return <FormContainer {...restProps}>{children}</FormContainer>;
};

Form.PictureContainer = function FormPictureContainer({ children, ...restProps }) {
  return <PictureContainer {...restProps}>{children}</PictureContainer>;
};

Form.Image = function FormImage({ ...restProps }) {
  return <Image {...restProps} />;
};

Form.DetailsContainer = function FormDetailsContainer({ children, ...restProps }) {
  return <DetailsContainer {...restProps}>{children}</DetailsContainer>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
  };

  Form.LinkEl = function FormLinkEl({ children, ...restProps }) {
    return <LinkEl {...restProps}>{children}</LinkEl>;
  };

  Form.Span = function FormSpan({ children, ...restProps }) {
    return <Span {...restProps}>{children}</Span>;
  };

  Form.Button = function FormButton({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
  };

  Form.InputWrapper = function FormInputWrapper({ children, ...restProps }) {
    return <InputWrapper {...restProps}>{children}</InputWrapper>;
  };


  Form.Input = function FormInput({...restProps }) {
    return <Input {...restProps}/>
  };

  Form.Icon = function FormIcon({ children, ...restProps }) {
    return <Icon {...restProps}>{children}</Icon>;
  };

  Form.Frame = function FormFrame({ children, ...restProps }) {
    return <Frame {...restProps}>{children}</Frame>;
  };

  Form.AccountWrapper = function FormAccountWrapper({ children, ...restProps }) {
    return <AccountWrapper {...restProps}>{children}</AccountWrapper>;
  };

  Form.Message = function FormMessage({ children, ...restProps }) {
    return <Message {...restProps}>{children}</Message>;
  };