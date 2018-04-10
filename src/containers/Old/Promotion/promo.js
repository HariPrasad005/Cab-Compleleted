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
      Age:'',
      Address:'',
      MobileNo:'',
      Aadhar:'',
      
    })
    }
    
      componentWillMount() {
        const {currentUser}= firebase.auth();
        firebase.database().ref('/users/' + currentUser.uid + '/customers/').on('value', snapshot => {
          this.setState({ Username: snapshot.val().Username, Age:snapshot.val().Age,Address:snapshot.val().Address,MobileNo:snapshot.val().MobileNo,Aadhar:snapshot.val().Aadhar });
          
        });
      }
      UpdateUser = (Username,Age,Address,MobileNo,Aadhar)=>{
        console.log(Username);
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            const {currentUser}= firebase.auth();
            firebase.database().ref('/users/' + currentUser.uid + '/customers/').set({Username,Age,Address,MobileNo,Aadhar});
            alert('Update Success');
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
            <Text>Name:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             value={this.state.Username}
             onChangeText={(Username)=>this.setState({Username})} />
          </Item>

          <Text>Age:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             value={this.state.Age}
             onChangeText={(Age)=>this.setState({Age})} />
          </Item>

          <Text>Address:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             value={this.state.Address}
             onChangeText={(Address)=>this.setState({Address})} />
          </Item>

          <Text>Mobile No:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             value={this.state.MobileNo}
             onChangeText={(MobileNo)=>this.setState({MobileNo})} />
          </Item>

          <Text>Aadhar Card Number:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             value={this.state.Aadhar}
             onChangeText={(Aadhar)=>this.setState({Aadhar})} />
          </Item>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() =>this.UpdateUser(this.state.Username,this.state.Age,this.state.Address,this.state.MobileNo,this.state.Aadhar)}
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
          <Title>View Profile</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
