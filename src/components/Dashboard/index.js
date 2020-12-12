import {Container, Inner, Summary, Link} from './styles/dashboard';

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