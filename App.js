import React, { Component } from 'react'
import Toast from 'native-base';
import AuthScreen from './src/containers/AuthScreen'
import HomeScreen from './src/containers/Old/HomeScreen/index'
import * as firebase from 'firebase';
import Profile from './src/containers/Old/ProfileScreen/Profile'
/**
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
export class LoginAnimation extends Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyALkjwS1gJdKclMqnkXX4RjGbiAEg6-aBY",
      authDomain: "cab-hiring-application.firebaseapp.com",
      databaseURL: "https://cab-hiring-application.firebaseio.com",
      projectId: "cab-hiring-application",
      storageBucket: "cab-hiring-application.appspot.com",
      messagingSenderId: "1042887327066"
    };
    firebase.initializeApp(config);
  }
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?

  }


  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  _simulateLogin = (email, password) => {
       sign = () => {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
    }
       if(password.length<=5 && email.length<=5){
         alert('Password is less than six');
       }
       else{
        // if(firebase.auth().signInWithEmailAndPassword(email,password)){
           
        //  this.setState({ isLoading: true })
         // setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
        // }
        // else{
         // this.setState({ isLoggedIn: false, isAppReady: false })
         
         firebase.auth().signInWithEmailAndPassword(email, password)
         .then(function(res){
          sign();
         })
         .catch(function(error) {
          // Handle Errors here.
              this.flag="false";
              var errorCode = error.code;
              var errorMessage = error.message;
          // [START_EXCLUDE]
          if (this.errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(this.errorCode);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      
    }
         
      
   
          
      
      
        


  _simulateSignup = (email, password) => {

    signup = () => {
      this.setState({ isLoading: true })
      setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
    }
    if(password.length<=5){
      alert('Password Less than Six');
    }
       else{
        // if(firebase.auth().signInWithEmailAndPassword(email,password)){
           
        //  this.setState({ isLoading: true })
         // setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
        // }
        // else{
         // this.setState({ isLoggedIn: false, isAppReady: false })
         
         firebase.auth().createUserWithEmailAndPassword(email,password)
         .then(function(res){
          signup();
         })
         .catch(function(error) {
          // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
          // [START_EXCLUDE]
          if (this.errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(this.errorCode);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }

    
   
      }
    
    

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render () {
    if (this.state.isAppReady) {
      return (
        <HomeScreen
          logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
        />
      )
    } else {
      return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      )
    }
  }
}

export default LoginAnimation
