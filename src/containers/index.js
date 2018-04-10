import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';
import CustomButton from '../../components/CustomButton'
import MapView from 'react-native-maps';
import * as firebase from 'firebase';

export default class HomeScreen extends Component {
  static propTypes = {
    logout: PropTypes.func
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } else {
        console.log("Error");
      }
    });

  }
  onSignout=()=>{
    firebase.auth().signOut().then(function() {
      
    }).catch(function(error) {
  
    });
  }

  render () {
    return (
      <View style={styles.container}>
        
        //<CustomButton
         // text={'Logout'}
         // onPress={this.props.logout}
         // buttonStyle={styles.button}
          //textStyle={styles.buttonText}
         // onPress={() => onSignout()}
        />
       
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
