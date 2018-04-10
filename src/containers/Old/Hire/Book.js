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
import Tab1 from './Hire';
import Tab2 from './History';

import { StackNavigator } from "react-navigation";




export default class Hiring extends React.Component {

  render() {
    return (
      <Container>
      <Tabs>
        <Tab heading={ <TabHeading><Text>Hiring</Text></TabHeading>}>
          <Tab1 />
        </Tab>
        <Tab heading={ <TabHeading><Text>Previous History</Text></TabHeading>}>
          <Tab2 />
         </Tab> 
         
       
      </Tabs>
    </Container>
    );
  }
}
Hiring.navigationOptions = ({ navigation }) => {
  return {
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Rent A Car</Title>
        </Body>
        <Right />
      </Header>
    )
  };
};
