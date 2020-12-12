import React, { useState } from "react";
import {
  Container,
  Inner,
  TextLink,
  Header,
  Wrapper,
  Body,
  TabletNav,
  Btn,
} from "./styles/nav";

export default function Nav({ children, ...restProps }) {
  return (
    <Container>
      <Inner {...restProps}>{children}</Inner>
    </Container>
  );
}

Nav.Header = function NavHeader({ children, ...restProps }) {
  return <Header {...restProps}>{children}</Header>;
};

Nav.TextLink = function NavTextLink({ children, ...restProps }) {
  return <TextLink {...restProps}>{children}</TextLink>;
};


Nav.Wrapper = function NavWrapper({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
};

Nav.Body = function NavBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};

Nav.TabletNav = function NavTabletNav({ children, ...restProps }) {
  return <TabletNav {...restProps}>{children}</TabletNav>;
};

Nav.Btn = function NavBtn({ children, ...restProps }) {
  return <Btn {...restProps}>{children}</Btn>;
};
