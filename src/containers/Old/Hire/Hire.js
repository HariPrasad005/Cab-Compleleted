import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, List,ListItem,Text,Button } from 'native-base';
import DatePicker from 'react-native-datepicker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import * as firebase from 'firebase';
export default class Hire extends Component {
    constructor(props){
        super(props)
        this.state = {sdate:"2018-04-10"}
        this.state = {edate:"2018-04-10"}
        this.state=({
          Distance:'',
          CarType:'',
          PromoCode:'',
          TotalAmount:''
        })
      }

      calAmt = (Distance)=>{
        var amount=parseInt(Distance)*15;
        alert('Estimated amount:'+amount);
      }

      componentWillMount() {
        const {currentUser}= firebase.auth();
        firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').on('value', snapshot => {
          this.setState({ TotalAmount: snapshot.val().TotalAmount});
           });
      }

      onSelect(index, value){
        this.setState({
          CarType: `${value}`
        })
      }

      payment = (sdate,edate,TotalAmount,CarType,Distance,PromoCode)=>{
        if(parseInt(Distance)>0)
        {
          var amount=parseInt(Distance)*7;
        if(parseInt(TotalAmount)>=amount)
        {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            const {currentUser}= firebase.auth();
            firebase.database().ref('/users/' + currentUser.uid + '/history/').set({sdate,edate,amount,CarType,Distance,PromoCode});
            TotalAmount=parseInt(TotalAmount)-parseInt(amount);
          firebase.database().ref('/users/' + currentUser.uid + '/payment/Money/').set({TotalAmount});
            alert('Booked!!');
          } else {
            alert('Error!');
          }
        
        });
      }
      else{
        alert('Innsufficient funds');
      }
        }
        else{
          alert('Please give distance');
        }
      }
      
      
  render() {
    return (
      <Container>
        <Content>
          <Form>
              <List>
               <ListItem>   
            <Item fixedLabel>
              <Label>Distance in km</Label>
              <Input onChangeText={(Distance)=>this.setState({Distance})}/>
            </Item>
            </ListItem>  
            <ListItem>  
            <Label>Start date</Label>
     
     
      <DatePicker
        style={{width: 200}}
        date={this.state.sdate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-04-10"
        maxDate="2019-04-10"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({sdate: date})}}
      />
       </ListItem>  
       <ListItem>  
       <Label>End date</Label>
      <DatePicker
        style={{width: 200}}
        date={this.state.edate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-04-10"
        maxDate="2019-04-10"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({edate: date})}}
      />
      </ListItem>
      <ListItem>
      <RadioGroup
        onSelect = {(index,value) => {this.onSelect(index,value)}}
      >
        <RadioButton value={'Sedan'} >
          <Text>Sedan</Text>
        </RadioButton>

        <RadioButton value={'HatchBack'}>
          <Text>HatchBack</Text>
        </RadioButton>
      </RadioGroup>
      </ListItem>
      <ListItem>   
            <Item fixedLabel>
              <Label>Promotion Code</Label>
              <Input placeholder="Only If Available" 
              onChangeText={(PromoCode)=>this.setState({PromoCode})}/>
            </Item>
            </ListItem>
            <ListItem>
            <Button
            full
            rounded
            dark
            style={{ marginTop: 50 }}
            onPress={() =>this.calAmt(this.state.Distance)}
          >
            <Text>To Check Amount</Text>
            
          </Button>
          </ListItem>
          <ListItem>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 50 }}
            onPress={() =>this.payment(this.state.sdate,this.state.edate,this.state.TotalAmount,this.state.CarType,this.state.Distance,this.state.PromoCode)}
          >
            <Text>Pay</Text>
            
          </Button> 
          </ListItem>   
           </List>
          </Form>
        </Content>
      </Container>
    );
  }
}