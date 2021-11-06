import './login.css';
import React from 'react';

import DataStore from './datastore';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
    };

    this.info = {emailAddress: '', password: ''};

    this.db = new DataStore();
    // NOTE: for testing
    this.db.add("admin@fullerton.edu", "pass123");
    this.db.add("student1@fullerton.edu", "apple98");

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleFieldChange(event) {
    //console.log("handleFieldChange -> ", event.target.id);
    switch (event.target.id) {
      case 'user-email':
        //this.setState({emailAddress: event.target.value});
        this.info.emailAddress = event.target.value;
        break;
      case 'user-pwd':
        //this.setState({password: event.target.value});
        this.info.password = event.target.value;
        break;
      default:
        break;
    }
  }
  
  async handleLoginSubmit(event) {    
    //console.log('Login request: ' + this.info.emailAddress + ', ' + this.info.password);
    
    // DataStore doesn't need async/await, however this'll be used for FireStore.
    await this.db.get(this.info.emailAddress).then(function(value) {
      if (value === undefined) {
        this.setState({errorMessage: 'Invalid email address.'});
      }
      else {
        //event.target.reset();

        if (this.info.password === value) {
          // https://stackoverflow.com/questions/59402649/how-can-i-use-history-pushpath-in-react-router-5-1-2-in-stateful-component
          this.props.history.push('/menu');
        }
        else {
          this.setState({errorMessage: 'Incorrect password.'});
        }
      }
    }.bind(this));

    event.preventDefault();
  }

  render() {
    return (
    <div className='Login'>
      <span id='login-background'></span>
      <div id='login-container'>
        <img src={'./assets/logo.png'} id='login-logo' alt='Login Logo'/>
        <form id='login-form' onSubmit={this.handleLoginSubmit}>
          <span id='login-error-text'>{this.state.errorMessage}</span>
          <input type="email" className="form-control" id="user-email" placeholder="Email" required onChange={this.handleFieldChange} />
          <input type="password" className="form-control" id="user-pwd" placeholder="Password" required onChange={this.handleFieldChange}/>
          <input className='btn btn-primary' id='login-button' type="submit" value="Login"/>
        </form>
      </div>
    </div>
    )
  }
}

export default Login;
