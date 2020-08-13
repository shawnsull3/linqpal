import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CryptoJS from 'crypto-js';
import { AES_Code } from '../../server/AES';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showError: false,
      error: 'Username or Password is incorrect'
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    let { value, id } = e.target;
    this.setState({[id]: value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const encrypted = CryptoJS.AES.encrypt(this.state.password, AES_Code).toString();
    const adminData = {
      username: this.state.username,
      password: encrypted
    }

    axios.post('http://localhost:4000/auth', adminData)
      .then( login => {
        if (login.data) {
          this.props.history.push({
            pathname: '/admin',
            state: { access: true }
          })
        } else {
          this.setState({showError: true})
        }
      })
      .catch((err) => {
          console.log(err);
      });
  }

  render() {
    const { showError, error } = this.state;

    return (
      <div>
        <h4>Admin Login</h4>
        <Form className='login-form' onSubmit={this.handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={this.handleInput}/>
          </Form.Group>
    
          <Form.Group controlId="password">
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" onChange={this.handleInput}/>
          </Form.Group>
          {showError && <p className='error'>{error}</p>}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
 
export default Login;