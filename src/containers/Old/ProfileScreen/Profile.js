import React from "react";
import { AppRegistry, Alert  } from "react-native";
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

  
  UpdateUser = (Username,Age,Address,MobileNo,Aadhar)=>{
    if(Username.length<=4){
      alert('Username should have more than 4 letters');
    }
    else if(Age<18 || Age>100){
      alert('Age is not valid');
    }
    else if(MobileNo.length!=10){
      alert('It is not a valid Mobile No');
    }
    else if(Aadhar.length!=12){
      alert('It is not a valid Aadhar No');
    }
    else{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const {currentUser}= firebase.auth();
          firebase.database().ref('/users/' + currentUser.uid + '/customers/').set({Username,Age,Address,MobileNo,Aadhar});
          alert('Update success');
        } else {
          alert('Error!');
        }
       
      });
    }
 
  
      
 
    }
 
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Username:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="Name"
             onChangeText={(Username)=>this.setState({Username})} />
          </Item>

          <Text>Age:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="Age"
             onChangeText={(Age)=>this.setState({Age})} />
          </Item>

          <Text>Address:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="Address"
             onChangeText={(Address)=>this.setState({Address})} />
          </Item>

          <Text>Mobile No:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="Phone Number"
             onChangeText={(MobileNo)=>this.setState({MobileNo})} />
          </Item>

          <Text>Aadhar Card Number:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="Aadhar Card Number"
             onChangeText={(Aadhar)=>this.setState({Aadhar})} />
          </Item>

           <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() =>this.UpdateUser(this.state.Username,this.state.Age,this.state.Address,this.state.MobileNo,this.state.Aadhar)}
          >
            <Text>Save Your Profile</Text>
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
          <Title>Update Profile</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
