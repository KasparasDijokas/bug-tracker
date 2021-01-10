import firebase from '../config/firebase';
import {useHistory} from 'react-router-dom'

const Home = (props) => {
    const history = useHistory();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          history.push("/projects");
        } else {
            history.push("/signin");
        }
      });
    return (
        <>
        </>
    )
}

export default Home;


