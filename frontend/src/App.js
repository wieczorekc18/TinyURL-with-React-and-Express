import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      url: '',
      link: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('http://localhost:5000/api/shorten',{
      url: e.target.value
    })
      .then(res => {
        console.log(res)
      })
  }

  handleChange(e){
    e.preventDefault()
    this.setState({
      url: e.target.value
    })
  }

  render(){
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
              <input
                className="urlFormInput"
                type="text"
                name="url"
                placeholder="Enter URL you wish to shorten"
                onChange={this.handleChange}
              />
              <input type="submit" value="shorten"/>
          </fieldset>
        </form>
        <fieldset>
          <div className="shortendURL">{this.state.link}</div>
        </fieldset>
      </div>
    );
  }
}

export default App;
