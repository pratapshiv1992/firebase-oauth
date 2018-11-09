import React, { Component } from 'react';
import firebase  from 'firebase';
import $  from 'jquery';

var config = {
  apiKey: "AIzaSyA4fvT8hFdxycqU3vhP5HUDY_Ube7zZusE",
  authDomain: "firebaase-tutorial-with-shiv.firebaseapp.com",
  databaseURL: "https://firebaase-tutorial-with-shiv.firebaseio.com",
  projectId: "firebaase-tutorial-with-shiv",
};

firebase.initializeApp(config);
var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log("user logeed in");
  } 
  
  else {
    console.log("-----------user signed out-----------");
    localStorage.removeItem('myToken');
  }
});


function addUser(user){
  let object = {
    displayName : user.displayName,
    email : user.email,
    emailVerified : user.emailVerified,
    photoURL : user.photoURL,
    isAnonymous : user.isAnonymous,
    uid : user.uid,
  }

  

  // return $.ajax({
  //   type:'POST',
  //   url: 'https://us-central1-firebaase-tutorial-with-shiv.cloudfunctions.net/helloWorld',
  //   data: object,
  //   contentType: 'application/x-www-form-urlencoded'
  // });

  return $.ajax({
    type: 'GET',
    // make sure you respect the same origin policy with this url:
    // http://en.wikipedia.org/wiki/Same_origin_policy 
    url: 'https://us-central1-cloud-function-with-shiv.cloudfunctions.net/cloudapi/',
    // url: 'http://localhost:4000/',
    data: object,
    success: function(msg){
        alert('wow' + msg);
    }
});
     
} 

// var postIdTokenToSessionLogin = function(url, idToken, csrfToken) {
//   // POST to session login endpoint.
//   return $.ajax({
//     type:'POST',
//     url: 'https://us-central1-firebaase-tutorial-with-shiv.cloudfunctions.net/helloWorld',
//     data: {idToken: idToken, csrfToken: csrfToken},
//     contentType: 'application/x-www-form-urlencoded'
//   });
// };

class App extends Component {  
  componentDidMount(){
    const tempToken = localStorage.getItem('myToken');
    if(!tempToken && false){
      console.log("--------------get Token let login------------------");
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          localStorage.setItem('mytoken',token);
          var user = result.user;
          addUser(user);
          console.log("--------------signInWithPopup------------------>>>",user);
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log("-------------error------------------->>>",errorMessage);
      });
    }
    else
    {
      addUser({
        displayName:"sccscs",
        email:"csdcdscsc",
        emailVerified:"scscdscsd",
        photoURL:"scsdcsd",
        isAnonymous:"csdcsdcsdc",
        uid:"scscsd",
      });
    }

  }

  render() {
    return (
      <div id="container">
          <h3>Session Management Demo</h3>
          <div id="loading">Loading...</div>
          <div id="redirecting" class="hidden">Redirecting...</div>
          <div id="firebaseui-container"></div>
    </div>
    );
  }
}

export default App;
