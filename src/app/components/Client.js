import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CryptoJS from 'crypto-js';
import { AES_Code } from '../../server/AES';

import axios from 'axios';
 
class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zip: null,
      SSN: '',
      isAdmin: false,
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    let { value, type, id } = e.target;
    this.setState({[id]: type === 'number' ? parseFloat(value) : value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const userData = this.state;
    const encrypted = CryptoJS.AES.encrypt(this.state.SSN, AES_Code).toString();
    userData.SSN = encrypted;

    axios.post('http://localhost:4000/newUser', userData)
      .then( res => {
        console.log(res.data)
      })
      .catch((err) => {
          console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Form className='form' onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Jane" onChange={this.handleInput}/>
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Doe" onChange={this.handleInput}/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="123-456-7890" onChange={this.handleInput}/>
            </Form.Group>

            <Form.Group as={Col} controlId="SSN">
              <Form.Label>Social Security Number</Form.Label>
              <Form.Control type="text" placeholder="123-45-6789" onChange={this.handleInput}/>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="address" id="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type ="text" placeholder="1234 Main St" onChange={this.handleInput} />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder="Boulder" onChange={this.handleInput}/>
            </Form.Group>

            <Form.Group as={Col} controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control placeholder="Colorado" onChange={this.handleInput}/>
            </Form.Group>

            <Form.Group as={Col} controlId="zip">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="number" placeholder="80301" onChange={this.handleInput}/>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        <Button variant="primary" className="login-btn" onClick={() => this.props.history.push('/login')} >
          Admin Login
        </Button>
      </div>
    );
  }
}
 
export default Client;