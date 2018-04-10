import React, { Component } from 'react';
import { Container, Header, Content, 
  Button, Form, Item,
   Input, Label,Thumbnail,Text,
   Left, Right,Icon, Title, Body, Card } from 'native-base';
   import Icon1 from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
export default class NetBanking extends Component {
  constructor(props){
    super(props)
    this.state=({
      CardName:'',
      AccountNumber: '',
      Password:'',
      BankName: '',
      Amount: '',
      TotalAmount: ''
    })
    }
    
   

    UpdateNetBanking = (CardName,AccountNumber,Password,BankName,Amount,TotalAmount)=>{


      if(CardName.length<=6){
        alert('Card Holder Name is less than 6 character');
      }
      else if(AccountNumber.length!=11){
        alert('Invalid Account Number');
      }
      else if(Password.length<=6){
        alert('Invalid password');
      }
      else if(BankName.length<=6){
        alert('Invalid bank name');
      }
      else{
      console.log(CardName);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          const {currentUser}= firebase.auth();
          firebase.database().ref('/users/' + currentUser.uid + '/payment/NetBanking/').set({CardName,AccountNumber,Password,BankName,Amount});
          TotalAmount=parseInt(TotalAmount)+parseInt(Amount);
          firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').set({TotalAmount});
          alert('Updated!!');
        } else {
          alert('Error!');
        }
      
      });
    }
    }

    componentWillMount() {
      const {currentUser}= firebase.auth();
      firebase.database().ref('/users/' + currentUser.uid + '/payment/Money').on('value', snapshot => {
        this.setState({ TotalAmount: snapshot.val().TotalAmount});
         });
    }
    

  render() {
    return (


      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
            <Icon name='person' style={{fontSize: 30}}/> 
              <Label>User Name</Label>
              <Input onChangeText={(CardName)=>this.setState({CardName})}/>
            </Item>
            <Item floatingLabel >
              <Label>Account Number</Label>
              <Input onChangeText={(AccountNumber)=>this.setState({AccountNumber})}
              keyboardType={'numeric'}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              
              <Input secureTextEntry={true}
              onChangeText={(Password)=>this.setState({Password})}/>
            </Item>
            <Item floatingLabel>
              <Label>Bank Name</Label>
              
              <Input onChangeText={(BankName)=>this.setState({BankName})}/>
            </Item>
            <Item floatingLabel>
              <Label>Amount</Label>
              
              <Input onChangeText={(Amount)=>this.setState({Amount})} />
            </Item>
         


            <Button rounded style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() =>this.UpdateNetBanking(this.state.CardName,this.state.AccountNumber,this.state.Password,this.state.BankName,this.state.Amount,this.state.TotalAmount)}
            >
            <Text>Proceed</Text>
             </Button>
            
          </Form>
        </Content>
      </Container>
    );
  };
}