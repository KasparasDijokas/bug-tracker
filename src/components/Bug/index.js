import React from 'react';
import {Container, Header, Title, User, Footer} from './styles/bug';

export default function Bug({children, ...restProps}) {
    return <Container {...restProps}>{children}</Container>
}

Bug.Header = function BugHeader({children, ...restProps}) {
    return <Header {...restProps}>{children}</Header>
}

Bug.Title = function BugTitle({children, ...restProps}) {
    return <Title {...restProps}>{children}</Title>
}

Bug.User = function BugUser({children, ...restProps}) {
    return <User {...restProps}>{children}</User>
}

Bug.Footer = function BugFooter({children, ...restProps}) {
    return <Footer {...restProps}>{children}</Footer>
}