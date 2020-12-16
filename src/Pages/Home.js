import React, {useState, useEffect} from 'react';
import DashboardContainer from '../containers/DashboardContainer';
import {withRouter} from 'react-router';
import NavContainer from '../containers/NavContainer';
import {Modal} from '../components';
import firebase from '../config/firebase';


const Home = (props) => {
    return (
        <>
        <NavContainer/>
        <DashboardContainer/>
        <Modal></Modal>
        </>
    )
}

export default withRouter(Home);


