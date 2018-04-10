import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types';
import CustomButton from '../../components/CustomButton'
import MapView from 'react-native-maps';
import { StackNavigator } from "react-navigation";
import * as firebase from 'firebase';
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
  Thumbnail} from "native-base";

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

  render () {
    return (
   
      <Container>
        <Content padder>
           <Thumbnail style={{ marginLeft: 135 }} large source={{uri: 'http://godofindia.com/wp-content/uploads/2017/05/rajinikanth.jpg'}}
            />
            <Text>Username:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="John"
             onChangeText={(Username)=>this.setState({Username})} />
          </Item>
          <Text>Mobile No:</Text>
            <Item floatingLabel style={{ marginTop: 5 }}>
          <Input
             placeholder="936613962" 
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
          <CustomButton
          text={'Logout'}
          onPress={this.props.logout}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />

        </Content>
      </Container>

      
    )
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
