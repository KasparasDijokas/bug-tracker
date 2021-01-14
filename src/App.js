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
import { IsUserLoggedIn, ProtectedRoot } from "./helper/routes";
import useAuthListener from "./hooks/useAuthListener";

function App() {
  const { user } = useAuthListener();

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
            <IsUserLoggedIn
              user={user}
              loggedInPath="/projects"
              path="/signup"
              exact
            >
              <Signup />
            </IsUserLoggedIn>

            <ProtectedRoot user={user} exact path="/projects">
              <NavContainer />
              <Projects />
            </ProtectedRoot>

            <ProtectedRoot user={user} exact path="/reset">
              <Reset />
            </ProtectedRoot>

            <ProtectedRoot user={user} exact path="/overview">
              <NavContainer />
              <Overview />
            </ProtectedRoot>

            <ProtectedRoot user={user} exact path="/members">
              <NavContainer />
              <Members />
            </ProtectedRoot>

            <ProtectedRoot user={user} exact path="/roles">
              <NavContainer />
              <RolesPage />
            </ProtectedRoot>

            <ProtectedRoot user={user} exact path="/issues">
              <NavContainer />
              <IssuesPage />
            </ProtectedRoot>

            <ProtectedRoot user={user} exact path="/settings">
              <NavContainer />
              <Settings />
            </ProtectedRoot>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
