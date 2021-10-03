import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA8geGY-0VRysXhogTHXvPwXFJMnA6yHm8",
  authDomain: "login-dashboard-8f61c.firebaseapp.com",
  projectId: "login-dashboard-8f61c",
  storageBucket: "login-dashboard-8f61c.appspot.com",
  messagingSenderId: "1039107055891",
  appId: "1:1039107055891:web:e0056cfef2139251adfae6"
};


const fire = firebase.initializeApp(firebaseConfig);

export default fire; 