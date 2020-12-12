import React from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import {withRouter} from 'react-router';
import NavContainer from '../containers/NavContainer';
import {Modal} from '../components';

const Home = (props) => {
    return (
        <>
        <NavContainer/>
        <DashboardContainer/>
        <Modal>modal</Modal>
        </>
    )
}

export default withRouter(Home);