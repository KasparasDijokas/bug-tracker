import GlobalStyles from './globalStyles';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Signin from './Pages/Signin.js';
import Signup from './Pages/Signup';
import Reset from './Pages/Reset';
import Home from './Pages/Home';


function App() {
  return (
    <Router>
    <GlobalStyles/>
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/signin"><Signin/></Route>
      <Route exact path="/signup"><Signup/></Route>
      <Route exact path="/reset"><Reset/></Route>
    </Switch>
     
    </Router>
  );
}

export default App;
