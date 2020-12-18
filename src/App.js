import GlobalStyles from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "./pages/Signin.js";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import Projects from "./pages/ProjectsPage";
import NavContainer from "./containers/NavContainer";
import DashboardContainer from "./containers/DashboardContainer";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/reset">
            <Reset />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route path="/:id">
            <ProjectDetails/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
