import firebase from "../config/firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from '../constants/routes';

const Home = (props) => {
  const history = useHistory();
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      history.push(ROUTES.PROJECTS);
    } else {
      history.push(ROUTES.SIGN_IN);
    }
  });
  return <></>;
};

export default Home;
