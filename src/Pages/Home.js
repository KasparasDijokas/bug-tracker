import React from 'react';
import DashboardContiner from '../containers/DashboardContainer';
import {withRouter} from 'react-router';

const Home = (props) => {
    return (
        <DashboardContiner/>
    )
}

export default withRouter(Home);