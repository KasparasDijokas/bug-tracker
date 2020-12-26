import GlobalStyles from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin.js";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Projects from "./pages/ProjectsPage";
import NavContainer from "./containers/NavContainer";
import DashboardContainer from "./containers/DashboardContainer";
import Overview from "./pages/Overview";
import './app.css';

function App() {
  return (
    <>
    <div className='app'>
      <Router>
        <GlobalStyles />
        <NavContainer/>
        <div className='app__body'>
        <DashboardContainer/>
          <div className='body__component'>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/reset" component={Reset}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/overview" component={Overview}/>
        </Switch>
        </div>
        </div>
      </Router>
      </div>
    </>
  );
}

export default App;
