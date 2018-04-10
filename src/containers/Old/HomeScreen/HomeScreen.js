import React,{PropTypes,Component} from "react";
import { StatusBar,Image } from "react-native";
import Signup from "../Login/signup.js";
//import App from "../../../../App";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
import * as firebase from 'firebase';
import navigation from "react-navigation";


export default class HomeScreen extends React.Component {

  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?

  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      } else {
        // No user is signed in.
      }
    });
  }
 
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
         <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>CALL CABS</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
          <CardItem cardBody>
              <Image source={{uri: 'http://www.topgear.com/india/images/stories/articles/512x288/2014Sep17005018.jpg'}} style={{height: 400, width: null, flex: 1}}/>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 50 }}
            onPress={() => this.props.navigation.navigate("SecondScreen")}
          >
            <Text>Log Out</Text>
            
          </Button>
      
        
        </Content>  
       
      </Container>
    );
  }
}
