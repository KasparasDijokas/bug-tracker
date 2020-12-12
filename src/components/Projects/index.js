import React from 'react';
import { Container, Inner, Header, Body, Wrapper, ProjectCard, Card, ProjectHeader, Main} from './styles/projects';

export default function Projects({children, ...restProps}) {
    return (
        <Container>
            <Inner {...restProps}>{children}</Inner>
        </Container>
    )
}

Projects.Header = function ProjectsHeader({children, ...restProps}) {
    return <Header {...restProps}>{children}</Header>
}

Projects.Body = function ProjectsBody({children, ...restProps}) {
    return <Body {...restProps}>{children}</Body>
}

Projects.Wrapper = function ProjectsWrapper({children, ...restProps}) {
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Projects.ProjectCard = function ProjectsProjectCard({children, ...restProps}) {
    return <ProjectCard {...restProps}>{children}</ProjectCard>
}

Projects.Card = function ProjectsCard({children, ...restProps}) {
    return <Card {...restProps}>{children}</Card>
}

Projects.ProjectHeader = function ProjectsProjectHeader({children, ...restProps}) {
    return <ProjectHeader {...restProps}>{children}</ProjectHeader>
}

Projects.Main = function ProjectsMain({children, ...restProps}) {
    return <Main {...restProps}>{children}</Main>
}