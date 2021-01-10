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
import Settings from "./pages/Settings";
import { IsUserLoggedIn } from "./helper/routes";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => {
    return state.firebase.auth.isEmpty;
  });

  console.log(user);

  return (
    <>
      <div className="app">
        <Router>
          <GlobalStyles />
          <Switch>
            <Route exact path="/" component={Home} />
            <IsUserLoggedIn
              user={user}
              loggedInPath="/projects"
              path="/signin"
              exact
            >
              <Signin />
            </IsUserLoggedIn>
            {/* <Route path="/signin" component={Signin} /> */}
            <Route path="/signup" component={Signup} />
            <Route path="/reset" component={Reset} />
            <Route path="/projects">
              <NavContainer />
              <Projects />
            </Route>

            {/* <IsUserLoggedIn user={user} loggedInPath='/signin' path="/projects" exact>
              <NavContainer />
              <Projects />
            </IsUserLoggedIn> */}

            <Route path="/overview">
              <NavContainer />
              <Overview />
            </Route>
            <Route path="/members">
              <NavContainer />
              <Members />
            </Route>
            <Route path="/roles">
              <NavContainer />
              <RolesPage />
            </Route>
            <Route path="/issues">
              <NavContainer />
              <IssuesPage />
            </Route>
            <Route path="/settings">
              <NavContainer />
              <Settings />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
