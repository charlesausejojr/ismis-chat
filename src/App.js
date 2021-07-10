import React, {useEffect} from 'react';
import './App.css';
import { selectUser, login, logout} from './features/userSlice';
import Ismessage from "./Ismessage";
import {useSelector,useDispatch} from 'react-redux';
import Login from "./Login";
import {auth} from "./firebase";

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
 
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
          dispatch(login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else{
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
    {user? (
      <>
      <Ismessage/>
      </>
    ): <Login/>}
        
    </div>
  );
}

export default App;
