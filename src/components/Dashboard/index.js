import {Container, Inner, Summary, Link, Route} from './styles/dashboard';

export default function Dashboard({children, ...restProps}) {
    return (
        <Container {...restProps}>
            <Inner {...restProps}>{children}</Inner>
        </Container>
    )
}

Dashboard.Summary = function DashboardSummary({children, ...restProps}) {
    return <Summary {...restProps}>{children}</Summary>
}

Dashboard.Link = function DashboardLink({children, ...restProps}) {
    return <Link {...restProps}>{children}</Link>
}

Dashboard.Route = function DashboardRoute({children, ...restProps}) {
    return <Route {...restProps}>{children}</Route>
}