import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import * as firebase from 'firebase';
export default class History extends Component {

  constructor(props){
    super(props)
    this.state=({
        CarType:'',
        Distance:'',
        PromoCode:'',
        sdate:'',
        edate:'',
        amount:''
    })
    }

    componentWillMount() {
      const {currentUser}= firebase.auth();
      firebase.database().ref('/users/' + currentUser.uid + '/history/').on('value', snapshot => {
        this.setState({ CarType:snapshot.val().CarType,Distance:snapshot.val().Distance,PromoCode:snapshot.val().PromoCode,sdate:snapshot.val().sdate,edate:snapshot.val().edate,amount:snapshot.val().amount});  
      });
    }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={{ uri: 'https://www.google.co.in/maps/vt/data=MOsrfNOne4uUkzDr4Wu8b5yeb85Bw3oBLxM2Uj-ZRyQ0cGadiTdBeDB535I8N7ZKdnTcgV0oCXNWc2c5hRMn93dX6yromV1qzV-d2zBmK1tXcaALzR6p35jeYxGWkXUnRiSPkBtqBXPdUehSnCdcnp2z4XnLTtXXEZC6t6uGi7BVYP5-TN_zNCHJgVdjdpzEwXVxXucp-2TjVn61zOqpREPtT7LrpncAeZB8' }} />
              <Body>
                <Text>Car Type:{this.state.CarType}</Text>
                <Text>Distance:{this.state.Distance}</Text>
                <Text>PromoCode:{this.state.PromoCode}</Text>
                <Text>sdate:{this.state.sdate}</Text>
                <Text>edate:{this.state.edate}</Text>
                <Text note>Amount:{this.state.amount}</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}