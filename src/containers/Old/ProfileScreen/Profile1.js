import React from "react";
import { AppRegistry, Alert } from "react-native";

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Item,
  Label,
  Input,
  Thumbnail
} from "native-base";

import { StackNavigator } from "react-navigation";
import * as firebase from 'firebase';




export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state=({
      Username:'',
      MobileNo:'',
      
    })
    }
  
  UpdateUser = (Username,MobileNo)=>{
    console.log(Username);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const {currentUser}= firebase.auth();
        firebase.database().ref('/users/' + currentUser.uid + '/customers/').set({Username,MobileNo});
        
      } else {
        alert('Error!');
      }
     
    });
  
      
 
    }
 
  render() {
    return (
      <Container>
        <Content padder>
           <Thumbnail style={{ marginLeft: 135 }} large source={{uri: 'http://godofindia.com/wp-content/uploads/2017/05/rajinikanth.jpg'}}
            />
            <Text>Username:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder={this.state.Username}
             onChangeText={(Username)=>this.setState({Username})} />
          </Item>
          <Text>Mobile No:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder={this.state.MobileNo}
             onChangeText={(MobileNo)=>this.setState({MobileNo})} />
          </Item>
           <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() =>this.UpdateUser(this.state.Username,this.state.MobileNo)}
          >
            <Text>Update</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
Profile.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
