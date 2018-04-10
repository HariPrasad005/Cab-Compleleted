import React, { Component } from 'react';
import { Container, Header,
   Content, Button, Form,Icon ,
   Item, Input, Label, Left, Right,  
   Thumbnail,Text, Card, Body, Title
   } from 'native-base';
   import * as firebase from 'firebase';
export default class CreditCard extends Component {

  constructor(props){
    super(props)
    this.state=({
      CardName:'',
      ValidUpto:'',
      CardNumber: '',
      CVVNumber:'',
      Amount: '',
      TotalAmount: ''
    })
    }

    componentWillMount() {
      const {currentUser}= firebase.auth();
      firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').on('value', snapshot => {
        this.setState({ TotalAmount: snapshot.val().TotalAmount});
         });
    }
    

    UpdateCard = (CardName,ValidUpto,CardNumber,CVVNumber,Amount,TotalAmount)=>{
      if(CardName.length<=6){
        alert('Card Holder Name is less than 6 character');
      }
      else if(CardNumber.length!=16){
        alert('Invalid  Card Number');
      }
      else if(CVVNumber.length!=3){
        alert('Invalid  CVV Number');
      }
      else{
        console.log(CardName);
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            const {currentUser}= firebase.auth();
            firebase.database().ref('/users/' + currentUser.uid + '/payment/card/').set({CardName,ValidUpto,CardNumber,CVVNumber,Amount});
            TotalAmount=parseInt(TotalAmount)+parseInt(Amount);
          firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').set({TotalAmount});
            alert('Card is Saved!!')
          } else {
            alert('Error!');
          }
         
        });
      }
      
    }

  render() {
    return (
      
      <Container>
        
    <Content>
          <Form>
              
            <Item floatingLabel style={{ marginTop:5}}>
            <Icon name='person' style={{fontSize: 30}}/>  
              <Label style={{marginLeft:20}}>Card holder's name</Label>
              <Input onChangeText={(CardName)=>this.setState({CardName})}/>
            </Item>

            <Item floatingLabel>
            <Icon name='bookmarks' style={{fontSize: 30}}/>  
              <Label style={{marginLeft:20}}>Valid Till </Label>
              <Input onChangeText={(ValidUpto)=>this.setState({ValidUpto})}/>
            </Item>

           <Item floatingLabel last>
            <Icon name='paper' style={{fontSize: 30}}/>  
              <Label style={{marginLeft:30}}>Card number</Label>
              <Input onChangeText={(CardNumber)=>this.setState({CardNumber})} keyboardType={'numeric'}/>
            </Item>

            <Item floatingLabel>
            <Icon name='paper' style={{fontSize: 30}}/>  
              <Label style={{marginLeft:20}}>CVV</Label>
              <Input secureTextEntry={true}
              onChangeText={(CVVNumber)=>this.setState({CVVNumber})} keyboardType={'numeric'}
              />
            </Item>

            <Item floatingLabel last>
            <Icon name='paper' style={{fontSize: 30}}/>  
              <Label style={{marginLeft:30}}>Amount</Label>
              <Input onChangeText={(Amount)=>this.setState({Amount})} keyboardType={'numeric'}/>
            </Item>


            <Button rounded style={{ marginTop: 20,alignSelf: "center" }}
            onPress={() =>this.UpdateCard(this.state.CardName,this.state.ValidUpto,this.state.CardNumber,this.state.CVVNumber,this.state.Amount,this.state.TotalAmount)}
            >
            <Text>Proceed</Text>
        
          </Button>

          </Form>
        </Content>
      </Container>
    );
  };
}