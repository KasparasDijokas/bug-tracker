import React from 'react';
import DashboardContiner from '../containers/DashboardContainer';
import {withRouter} from 'react-router';
import NavContainer from '../containers/NavContainer';

const Home = (props) => {
    return (
        <>
        <NavContainer/>
        <DashboardContiner/>
        </>
    )
}

export default withRouter(Home);