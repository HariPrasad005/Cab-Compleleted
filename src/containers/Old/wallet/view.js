import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import { Container, Header, Content, Card, Item, Label, Input, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class CardImage extends Component {
    constructor(props){
        super(props)
        this.state=({
            CardNumber:'',
            ValidUpto:'',
            CVVNumber:'',
            CVV:'',
            TotalAmount: '',
            Amount:''
        })
        }

        check = (CVV,Amount,TotalAmount)=>{
          const {currentUser}= firebase.auth();
          firebase.database().ref('/users/' + currentUser.uid + '/payment/card/').on('value', snapshot => {
            this.setState({CVVNumber: snapshot.val().CVVNumber});
            if(CVV===this.state.CVVNumber)
          {
            TotalAmount=parseInt(this.state.TotalAmount)+parseInt(Amount);
            firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').set({TotalAmount});
            alert('Payment Successfull');
          }
          else{
            alert('Please check your CVV Number');
          }
          })
        }
        componentWillMount() {
            const {currentUser}= firebase.auth();
            firebase.database().ref('/users/' + currentUser.uid + '/payment/card/').on('value', snapshot => {
              this.setState({ CardNumber: snapshot.val().CardNumber, ValidUpto:snapshot.val().ValidUpto});
              
            });
            firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').on('value', snapshot => {
              this.setState({ TotalAmount: snapshot.val().TotalAmount});
               });
          }
  render() {
    return (
      <Container>
    
        <Content>
          <Card>
          <CardItem>
              <Body>
                <Text>AvailableAmount:{this.state.TotalAmount}</Text>
                </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Credit Card Detail</Text>
                </Body>
            </CardItem>
          <CardItem cardBody>
            
              <ImageBackground source={{uri: 'https://www.bankofbaroda.com/writereaddata/images/visa-electron-card-img.png'}} style={{justifyContent:'center', alignItems:'center',height: 200, width: null, flex: 1}}>
              <Item floatingLabel  style={{marginLeft:90,marginRight:20,marginTop: 22}}>
              <Input
              value={this.state.CardNumber} />
             </Item>
          
               
            <Item floatingLabel  style={{marginLeft:143,marginRight:80, marginTop: 10}}>
           
            <Input
              value={this.state.ValidUpto} />
            </Item>

              </ImageBackground>
        
            </CardItem>
            
             <CardItem>
             <Item floatingLabel>
              <Label>Amount</Label>
              <Input onChangeText={(Amount)=>this.setState({Amount})}/>
            </Item> 
            </CardItem>
            <CardItem>
             <Item floatingLabel>
              <Label>CVV</Label>
              <Input  onChangeText={(CVV)=>this.setState({CVV})}/>
            </Item>                 
                 </CardItem>

                 <CardItem style={{alignSelf:'center'}}>
                 <Button rounded onPress={() =>this.check(this.state.CVV,this.state.Amount,this.state.TotalAmount)}>
                  <Text>Proceed To Pay</Text>
                  </Button>

                     </CardItem>
             
            
          </Card>
        </Content>
      </Container>
    );
  }
}