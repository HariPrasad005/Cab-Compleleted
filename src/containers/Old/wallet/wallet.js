import React from "react";
import { AppRegistry, Alert } from "react-native";
import Icon1 from 'react-native-vector-icons/FontAwesome';
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
  Title,
  Button,
  H1,Tab, Tabs, TabHeading,Icon
} from "native-base";
import Tab1 from './NetBanking';
import Tab2 from './CreditCard';
import Tab3 from './view.js';

import { StackNavigator } from "react-navigation";




export default class Wallet extends React.Component {

  render() {
    return (
      <Container>
      <Tabs>
        <Tab heading={ <TabHeading><Icon1 name="bank" style={{fontSize:20}} /><Text>NetBanking</Text></TabHeading>}>
          <Tab1 />
        </Tab>
        <Tab heading={ <TabHeading><Icon1 name="credit-card" style={{fontSize:20}} /><Text>CreditCard</Text></TabHeading>}>
          <Tab2 />
         </Tab> 
          <Tab heading={ <TabHeading><Icon1 name="credit-card" style={{fontSize:20}} /><Text>Saved Cards</Text></TabHeading>}>
          <Tab3 />
        </Tab>
       
      </Tabs>
    </Container>
    );
  }
}
Wallet.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Wallet</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
