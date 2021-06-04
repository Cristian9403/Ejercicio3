import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import ClearButton from './components/ClearButton';

var urlsuma  = 'http://localhost:3100/users';
var urlresta = 'http://localhost:3200/users';
var urlmulti = 'http://localhost:3300/users';
var urldivi  = 'http://localhost:3400/users';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input:"",
      previusNumber: "",
      currentNumber: "",
      operator: "",
      apiEndPoint: " ",
    }
  }

  add = () =>{
    this.setState({previusNumber: this.state.input});
    this.setState({input:""});
    this.setState({operator:"plus"});
    this.setState({apiEndPoint:urlsuma});
  }

  substract = () =>{
    this.setState({previusNumber: this.state.input});
    this.setState({input:""});
    this.setState({operator:"-"});
    this.setState({apiEndPoint:urlresta});
  }

  multiply = () =>{
    this.setState({previusNumber: this.state.input});
    this.setState({input:""});
    this.setState({operator:"*"});
    this.setState({apiEndPoint:urlmulti});
  }

  divide = () =>{
    this.setState({previusNumber: this.state.input});
    this.setState({input:""});
    this.setState({operator:"/"});
    this.setState({apiEndPoint:urldivi});
  }

  addToInput = val =>{
    this.setState({input: this.state.input + val});
  }
  
  addZeroToInput = val =>{
    if(this.state.input !== ""){
    this.setState({input: this.state.input + val});
    }
  }

  addDecimal = val =>{
    if(this.state.input.indexOf(".") === -1){
    this.setState({input: this.state.input + val});
    }
  }

  ClearInput = () =>{
    this.setState({input: ""});
  }

  evaluate = () => {
    this.state.currentNumber = this.state.input

    fetch(this.state.apiEndPoint, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log(response)
      this.setState({
        input:response.resulta
      });
    });
  }


  render(){
    return(
      <div className ="App">
      <div className = "calc-wrapper">
        <div className ="row">
          <Input>{this.state.input}</Input>
        </div>
        <div className ="row">
          <Button handleClick={this.addToInput}>7</Button>
          <Button handleClick={this.addToInput}>8</Button>
          <Button handleClick={this.addToInput}>9</Button>
          <Button handleClick={this.add}>+</Button>          
        </div>
        <div className ="row">
          <Button handleClick={this.addToInput}>4</Button>
          <Button handleClick={this.addToInput}>5</Button>
          <Button handleClick={this.addToInput}>6</Button>
          <Button handleClick={this.substract}>-</Button>    
        </div>
        <div className ="row">
          <Button handleClick={this.addToInput}>1</Button>
          <Button handleClick={this.addToInput}>2</Button>
          <Button handleClick={this.addToInput}>3</Button>
          <Button handleClick={this.multiply}>*</Button>
        </div>
        <div className ="row">
          <Button handleClick={this.addDecimal}>.</Button>
          <Button handleClick={this.addZeroToInput}>0</Button>
          <Button handleClick={this.evaluate}>=</Button>
          <Button handleClick={this.divide}>/</Button>          
        </div>
        <div className ="row">
          <ClearButton handleClear={this.ClearInput}>Clear</ClearButton>
        </div>
      </div>
    </div>
    );
  }
}

export default App;