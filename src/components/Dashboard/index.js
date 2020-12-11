import React from 'react';
import {Container, Inner, Header, Summary, Link} from './styles/dashboard';

export default function Dashboard({children, ...restProps}) {
    return (
        <Container>
            <Inner {...restProps}>{children}</Inner>
        </Container>
    )
}

Dashboard.Header = function DashboardHeader({children, ...restProps}) {
    return <Header {...restProps}>{children}</Header>
}

Dashboard.Summary = function DashboardSummary({children, ...restProps}) {
    return <Summary {...restProps}>{children}</Summary>
}

Dashboard.Link = function DashboardLink({children, ...restProps}) {
    return <Link {...restProps}>{children}</Link>
}