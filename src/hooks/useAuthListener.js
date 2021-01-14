import {useState, useEffect} from 'react';
import firebase from '../config/firebase';

export default function useAuthListener() {
    // if there is a user in localStorage - then store it in state
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

    // if there is authUser - save it in localStorage and change 'user' state
    // else - remove authUser from state and localStorage
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if(authUser) {
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        })

        // clean listener
        return () => listener();
    }, [])

    return {user};
}