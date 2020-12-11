import React from 'react';
import Dashboard from '../components/Dashboard';
import logo from '../Images/logo_main.png';

const DashboardContainer = () => {
    return (
        <Dashboard>
            <Dashboard.Header>
                <img src={logo} alt="logo"/>
                <span>BugTracker</span>
            </Dashboard.Header>
            <Dashboard.Summary>
                <img src={logo} alt="logo"/>
                <h1>Project name (props)</h1>
                <p>You are <span>Owner(props)</span></p>
            </Dashboard.Summary>
                <Dashboard.Link exact to="/overview"><span><i class="fab fa-buffer"></i></span>Project Overview</Dashboard.Link>
                <Dashboard.Link exact to="/users"><span><i class="fas fa-users"></i></span>Project Users</Dashboard.Link>
                <Dashboard.Link exact to="/roles"><span><i class="fas fa-user-plus"></i></span>Role Assignment</Dashboard.Link>
                <Dashboard.Link exact to="/issues"><span><i class="fas fa-bug"></i></span>Issues</Dashboard.Link>
                <Dashboard.Link exact to="/settings"><span><i class="fas fa-cog"></i></span>Settings</Dashboard.Link>
        </Dashboard>
    )
}

export default DashboardContainer;
