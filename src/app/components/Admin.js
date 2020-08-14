import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import CryptoJS from 'crypto-js';
import { AES_Code } from '../../server/AES';
 
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessAllowed: false,
      userInfo: [],
    }
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.state) {
      if (location.state.access) {
        this.setState({accessAllowed: true});
      }
    }
    axios.get('http://localhost:4000/allUserData')
      .then( userData => {
        this.setState({userInfo: userData.data})
      })
      .catch((err) => {
          console.log(err);
      });
  }

  render() {
    const { userInfo, accessAllowed } = this.state;
    return (
      <div>
        <h4>User Infomation</h4>
        {accessAllowed ? 
          <Table striped bordered hover className='user-table'>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Social Security Number</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.map( (user, i) => {
                const bytes = CryptoJS.AES.decrypt(user.SSN, AES_Code);
                const ssn = bytes.toString(CryptoJS.enc.Utf8)
                return (
                  <tr key={i+1}>
                    <td>{i+1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{`${user.address}, ${user.city}, ${user.state} ${user.zip}`}</td>
                    <td>{ssn}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          :
          <div>
            <p>Please Login</p>
            <Button variant="primary" onClick={() => this.props.history.push('/login')} >
              Back to login page
            </Button>
          </div>
        }
      </div>
    );
  }
}
 
export default Admin;