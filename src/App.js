import React, { Component } from 'react';
import firebase  from 'firebase';
import $  from 'jquery';


var config = {
  apiKey: "************your api key****************",
  authDomain: "************your auth domain****************",
  databaseURL: "************your database url****************",
  projectId:"************your projectid****************",
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

    return $.ajax({
      type: 'GET',
      url: 'https://yourendpoint/cloudapi/',
      data: object,
      success: function(msg){
          alert('wow' + msg);
      }
    })


} 


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

      // request data----- { displayName: 'sccscs',
      // email: 'csdcdscsc',
      // emailVerified: 'scscdscsd',
      // photoURL: 'scsdcsd',
      // isAnonymous: 'csdcsdcsdc',
      // uid: 'scscsd' }
      
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
