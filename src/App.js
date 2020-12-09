import LoginContainer from './containers/LoginContainer.js';
import GlobalStyles from './globalStyles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signup from './containers/Signup';

function App() {
  return (
    <Router>
    <GlobalStyles/>
    <Switch>
      <Route exact path="/signin"><LoginContainer/></Route>
      <Route exact path="/signup"><Signup/></Route>
    </Switch>
     
    </Router>
  );
}

export default App;
