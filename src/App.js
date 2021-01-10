import GlobalStyles from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin.js";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Projects from "./pages/ProjectsPage";
import NavContainer from "./containers/NavContainer";
import Overview from "./pages/Overview";
import Members from "./pages/Members";
import RolesPage from "./pages/Roles";
import IssuesPage from "./pages/Issues";

function App() {
  return (
    <>
    <div className='app'>
      <Router>
        <GlobalStyles />
        <NavContainer/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/reset" component={Reset}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/overview" component={Overview}/>
          <Route path="/members" component={Members}/>
          <Route path="/roles" component={RolesPage}/>
          <Route path="/issues" component={IssuesPage}/>
        </Switch>
      </Router>
      </div>
    </>
  );
}

export default App;
