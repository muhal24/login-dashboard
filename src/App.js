import React ,{useState , useEffect} from 'react';
import Firebase from './Firebase';
import Login from './Login';
import Hero from './Hero';
import './App.css';

const App = () => {
  const [user , setUser] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError ('');
    setPasswordError ('');
 }

  const handleLogin = () => {
    clearErrors ();
    Firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      // eslint-disable-next-line default-case
      switch(err.code) {
        case "auth/invalid-email":
          case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError (err.message);
              break;
              case "auth/wrong-password":
                setPasswordError (err.message);
                break;

      }
    });

  };

  const handleSignup = () => {
    clearErrors();
    Firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      // eslint-disable-next-line default-case
      switch(err.code) {
        case "auth/email-already-in-use":
          case "auth/invalid-email":
              setEmailError (err.message);
              break;
              case "auth/weak-password":
                setPasswordError (err.message);
                break;
      }
    });
  };
  const handleLogout = () => {
    Firebase.auth().signOut();
  };

  const authListener = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        clearInputs();
        setUser(user);
      } else {
          setUser("");
      }
    });
  };

  useEffect(() => {
authListener();
  }, [] );

  return (
    <div className="App">
      {user ? (
        <Hero handleLogout={handleLogout}/>
      ) : (
     <Login
      email={email} 
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignup={handleSignup} 
      hasAccount={hasAccount}
      setHasAccount= {setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
       />
      )}
     
    </div>
  );
};

export default App;
