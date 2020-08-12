import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
 
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/allUserData')
      .then( userData => {
        console.log(userData.data)
        this.setState({userInfo: userData.data})
      })
      .catch((err) => {
          console.log(err);
      });
  }

  render() {
    const { userInfo } = this.state;
    return (
      <div>
        <h4>User Infomation</h4>
        <Table striped bordered hover variant="dark" className='user-table'>
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
            {userInfo.map( (user, i) => (
              <tr key={i+1}>
                <td>{i+1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>{`${user.address}, ${user.city}, ${user.state} ${user.zip}`}</td>
                <td>{user.SSN}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
 
export default Admin;