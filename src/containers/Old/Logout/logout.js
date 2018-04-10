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
  H1
} from "native-base";
import {List, ListItem, InputGroup, Input } from 'native-base';

import { StackNavigator } from "react-navigation";


export default class Promo extends React.Component {

  render() {
    return (
      <Container>
      <Content>
          <List>
              <ListItem>
                  <InputGroup>
                      <Icon name='ios-mail' />
                      <Input placeholder="Email" />
                  </InputGroup>
              </ListItem>
              <ListItem>
                  <InputGroup>
                      <Icon name='ios-call' />
                      <Input placeholder='Phone Number' />
                  </InputGroup>
              </ListItem>
              <ListItem>
                  <InputGroup>
                      <Icon name='ios-lock' />
                      <Input placeholder='Password' secureTextEntry={true} />
                  </InputGroup>
              </ListItem>
              <ListItem>
                  <InputGroup>
                      <Icon name='ios-card' />
                      <Input placeholder='Credit Card Number' />
                  </InputGroup>
              </ListItem>
          </List>
      </Content>
  </Container>
    );
  }
}
Promo.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Promo Code</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
